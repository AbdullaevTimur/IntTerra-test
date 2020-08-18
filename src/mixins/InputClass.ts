import { Component, Prop, Watch } from 'vue-property-decorator'
import TDate from '@/models/TDate'
import { mixins } from 'vue-class-component'
import inputDataClass from '@/mixins/InputDateClass'

@Component
export default class InputClassMixin extends mixins(inputDataClass) {
  namespace = 'inputClass'

  @Prop([String, Number, Object]) readonly value?: string | number | object
  @Prop({ default: 'text' }) readonly type?: string
  @Prop([String]) readonly placeholder?: string

  postValue: string | boolean | number | Date | TDate | void = ''
  inited = false

  getInitialValue (val: string | boolean | number | Date | TDate, type = 'text') {
    // Получаю стартовое знаяение
    return type === 'date' ? this.convertDataToInputValue((val as TDate)) : val
  }

  @Watch('value', { immediate: true })
  onValueChanged (val: string | boolean | number | Date | TDate) {
    if (val || val === 0) {
      this.postValue = this.getInitialValue(val, this.type)
    }
    this.$nextTick(() => {
      this.inited = true
    })
  }

  @Watch('postValue')
  onPostValueChanged (newVal: string | boolean | number, oldVal: string | boolean | number) {
    // Служу за изменение переменой "postValue". В случае если новое значение не соответствует старому и тригер "init" = true. (т.е. компонент уже инициализирован), то выполняю следующие действия...
    if (newVal !== oldVal && this.inited) {
      // Если тип компонента не равен "date"
      if (this.type !== 'date') {
        this.$emit('input', newVal) // Публикую переменую на родительский компонент через $emit('input')
      }
    }
  }
}

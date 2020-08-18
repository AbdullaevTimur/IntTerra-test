import { Vue, Component } from 'vue-property-decorator'

@Component
export default class InputDateClassMixin extends Vue {
  namespace = 'InputDateClass'

  convertInputValueToDateAndEmit (value: Date) {
    // Преобразую значение аргумента функции в константу, и привожу ее в вид требуемый для хранения в модели.
    const obj = {
      year: value.getUTCFullYear(),
      month: value.getUTCMonth(),
      day: value.getUTCDate()
    }
    this.$emit('input', obj) // Публикую данную константу на родителя
  }

  convertDataToInputValue ({ year = 0, month = 0, day = 0 }) {
    // Преобразую получаемое значение в удобочитаемый вид (строку).
    return `${year}-${this.updateDateCharLength(month + 1)}-${this.updateDateCharLength(day)}`
  }

  updateDateCharLength (char: string | number) {
    // Проверяю сколько симоволов имеет значение аргумента функции. Если меьше двух, то дописывю "0"
    return char.toString().length < 2 ? `0${char}` : char
  }
}

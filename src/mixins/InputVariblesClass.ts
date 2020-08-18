import { Vue, Component } from 'vue-property-decorator'
import translation from '@/locales/intterra-ru-RU.json'

interface ModelInterface {
  key: string;
  label: string;
  value?: number | string | null;
}

@Component
export default class InputVariblesClassMixin extends Vue {
  namespace = 'InputVariblesClass'
  translationClass = JSON.parse(JSON.stringify(translation))
  varibles: Array<ModelInterface> | void = []

  setVaribles (model: object | Array<object>): void {
    const output: Array<ModelInterface> = []
    const objectWithStringKeys = Object.keys(model.valueOf()).filter(x => typeof model[x as keyof typeof model] === 'number')
    objectWithStringKeys.forEach((key) => {
      const obj: ModelInterface = {
        key,
        label: this.translationClass[key],
        value: model[key as keyof typeof model]
      }
      output.push(obj)
    })
    this.varibles = output
  }

  mounted () {
    this.$on('setVaribles', (model: object | Array<object>) => {
      this.setVaribles(model)
    })
  }
}

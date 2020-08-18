import Vue from 'vue'
import Vuex from 'vuex'
import Operation from '@/models/Operation'
import FieldService from '@/FieldService'
const FieldServiceClass = new FieldService()

Vue.use(Vuex)

interface Collections {
  operations?: Array<object | Array<object> | Operation>;
}

interface State {
  collections?: Collections | void;
}

export default new Vuex.Store({
  state: {
    collections: {}
  } as State,
  getters: {
    collection: state => (collection: string) => (state.collections as Collections)[collection as keyof Collections], // Орпеделяю функцияю для получения коллекции из "центрального хранилища".
    getItem: (state, getters) => (id: string | null | undefined, collection: string | null | undefined) => {
      const dataset = getters.collection(collection) // Получаем коллекцию гетром Vuex
      const index = dataset.findIndex((x: Operation) => x.id === id)
      // (?) Если такой объект в массиве есть. то возвращаем его
      // (:) Если такого объекта в списке, то возвращаем "null"
      return index > -1 ? dataset[index] : null
    }
  },
  mutations: {
    updateCollection (state: State, { collection, data }) {
      Vue.set((state.collections as Collections), collection, data) // Записывю значение в переменую хранилища "collections"
    },
    updateItem (state, { collection, data, getters }) {
      const dataset = getters.collection(collection) // Получаем коллекцию гетром Vuex
      const index = dataset.findIndex((x: Operation) => x.id === data.id) // Определяю индекс искомого объекта
      // (?) Если такой объект в массиве есть. то перезаписываем его и делаем рекативным
      // (:) Если такого объекта в списке, нет то добавяем его массив. Добавленое значение будет рекатиынм.
      index > -1 ? dataset[index] = data : dataset.push(data)
    }
  },
  actions: {
    uploadCollection: ({ commit }, { data, collection }) => {
      commit('updateCollection', { collection, data }) // Отправляю запрос на выполнение мутатации
    },
    saveItem: async ({ commit, getters }, { model, collection }) => {
      const data = await FieldServiceClass.saveOperation(model) // Сохраняю модель
      commit('updateItem', { collection, data, getters }) // Отправляю запрос на выполнение мутатации
    }
  }
})

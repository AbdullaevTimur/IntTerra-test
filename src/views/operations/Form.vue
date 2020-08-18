<template>
  <div class="container">
    <div class="content">
      <div class="block">
        <div class="headline">{{ labels.headline[$route.meta.method] }}</div>
      </div>
      <div class="block info" v-if="$route.params && $route.params.parent">
        <div class="meta">
          <div class="status"/>
          <div class="title">
            <div class="type">{{ $route.params.parent.type }}</div>
            <div class="number">{{ $route.params.parent.id }}</div>
          </div>
        </div>

        <div class="culture">
          <div class="title">
            <div class="type">{{ labels.culture.type }}</div>
            <div class="address">{{ labels.culture.address }}</div>
          </div>
          <div class="image">
            <img src="img/CropCorn.png"/>
          </div>
        </div>
      </div>
      <div class="block negative-margin">
        <OperationSelect v-model="model.type"/>
      </div>
      <div class="block info equal negative-margin">
        <DatetimePicker v-model="model.date"/>
        <AreaInput v-model="model.area" :placeholder="labels.placeholder.area"/>
      </div>
      <div class="block">
        <CommentTextarea v-model="model.comment" :placeholder="labels.placeholder.comment"/>
      </div>
      <div class="block">
        <AssessmentSelect v-model="model.assessment"/>
      </div>
    </div>
    <div class="menu">
      <div class="but" @click="save">{{ labels.button[$route.meta.method] }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Operation from '@/models/Operation'

export default Vue.extend({
  name: 'OperationForm',
  components: {
    OperationSelect: () => import('@/components/ui/inputs/OperationSelect.vue'),
    DatetimePicker: () => import('@/components/ui/inputs/DatetimePicker.vue'),
    CommentTextarea: () => import('@/components/ui/inputs/CommentTextarea.vue'),
    AssessmentSelect: () => import('@/components/ui/inputs/AssessmentSelect.vue'),
    AreaInput: () => import('@/components/ui/inputs/AreaInput.vue')
  },
  props: {
    required: {
      type: Array,
      default: () => [
        'type',
        'date',
        'area'
      ]
    }
  },
  data () {
    return {
      labels: {
        headline: {
          add: 'Добавление операции',
          edit: 'Редактирование операции'
        },
        placeholder: {
          area: 'Задайте',
          comment: 'Комментарий к операции...'
        },
        button: {
          add: 'Добавить операцию',
          edit: 'Редактировать операцию'
        },
        culture: {
          type: 'Озимая пшеница',
          address: 'Победа 50'
        },
        error: {
          fillAllInputs: 'Заполните все еобходимые поля. ("Операция", "Дата проведения", "Кол-во Га к обработке")'
        }
      },
      model: {} as Operation
    }
  },
  methods: {
    async getModel (id: string): Promise<Operation | void> {
      this.model = await this.$store.getters.getOperation(id) // Получаю "модель" по id
    },
    async save () {
      try {
        await this.checkSendData(this.model) // Проверяю заполнены ли обязательные поля
        this.$store.dispatch('saveItem', { model: this.model, ...this.$route.params }).then(() => {
          this.$router.push('/')
        }) // Записываю или перезаписываю сохранянную модель в центральное хранилище
      } catch (e) {
        alert(e)
      }
    },
    checkSendData (inputs: Operation): Promise<Operation | void> {
      // В случае если каждое обязательное поле имеет значение и не равно "null", то Promise выполнен, в противном случае вывожу ошибку
      return new Promise((resolve, reject) => {
        this.required.every(x => inputs[(x as keyof Operation)] || inputs[(x as keyof Operation)] === 0)
          ? resolve()
          : reject(this.labels.error.fillAllInputs)
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    // 1. Перед переходом на страницу, проверяю какое действие хочет совершить "пользователь", исходя из ссылки, по которой он переходит и meta-данных относящихся к этой ссылке.
    // 2. Если он хочет "редактировать" модель, то проверяю есть ли "параметрах" ссылки данные о модели. /// 3. Если есть то разрешаю quard, если нет, то перевожду к пустой форме для создания моедли.
    // 4. Если нет знаяений родителя и необходимых данных о нем (например "№ поля"), то возвращаю к таблице.
    next(async vm => {
      if (!to.params.parent) {
        vm.$router.push('/')
      }
      if (to.meta.method === 'edit' && to.params.id) {
        // Получаем "модель" через центральное количество
        const data = await vm.$store.getters.getItem(to.params.id, to.params.collection)
        // Проверем получили ли мы данные, и не равны ли они "null"
        if (data) {
          vm.$data.model = { ...data }
        }
        // ВАРИАНТ №2: Можем полуить "модель" нативной функцией модели (класса).
        // vm.$data.model = await FieldServiceClass.getOperation(to.params.id)
      }
    })
  }
})
</script>

<style lang="scss" scoped>
.headline {
  font-size: 21px;
  font-weight: 500;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  min-height: 100vh;
  max-height: 100vh;
  overflow: hidden;

  .content {
    order: 1;
    flex-grow: 1;
    flex-shrink: 1;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .menu {
    order: 2;
    flex-grow: 0;
    flex-shrink: 0;

    .but {
      display: flex;
      width: 100%;
      height: 60px;
      justify-content: center;
      align-items: center;
      font-size: 11px;
      font-weight: 500;
      text-transform: uppercase;
      background-color: var(--color-green);
      color: white;
      cursor: pointer;

      &:hover {
        background-color: darken(#66CC66, 10);
      }
    }
  }
}

.block {
  padding: 1em;

  &:not(:last-child) {
    border: 1px solid rgba(black, 0.03);
  }

  &.negative-margin {
    margin: -1em;
  }
}

.info {
  display: flex;
  justify-content: space-between;

  &.equal {
    & > * {
      flex-grow: 1;
      width: 50%;
      position: relative;
    }
  }
}

.meta {
  display: inline-flex;
  align-items: center;

  & > *:not(:last-child) {
    margin-right: 0.5em;
  }

  .status {
    display: inline-block;
    width: 27px;
    height: 27px;
    background-color: var(--color-lightgreen);
    border: 1px solid var(--color-green);
  }

  .title {
    font-weight: 500;
  }

  .type {
    font-size: 9px;
    text-transform: uppercase;
    line-height: 1.5em;
  }

  .number {
    font-size: 15px;
  }
}

.culture {
  display: inline-flex;
  align-items: center;
  text-align: right;

  & > *:not(:last-child) {
    margin-right: 0.5em;
  }

  .type {
    font-weight: normal;
    font-size: 15px;
  }

  .address {
    font-weight: 500;
    font-size: 9px;
    text-transform: uppercase;
    line-height: 1.5em;
    opacity: 0.7;
  }
}
</style>

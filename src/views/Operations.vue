<template>
  <Page class="page" :slim="true">
    <template slot="default">
      <div class="headline">{{ `${labels.headline} ${params.parent.id}` }}</div>
      <div class="page__toolbar toolbar">
        <div class="toolbar__triggers-group">
          <div
            v-for="(but, index) in buttons"
            :key="index"
            class="toolbar__trigger"
            :class="[{ 'toolbar__trigger_selected': triggers[but.trigger] }]"
            @click="switchTrigger(but.trigger)"
            v-text="but.text"
          />
        </div>
        <div class="toolbar__controls-group">
          <But @click.native="$router.push({ name: 'OperationAdd', params })" icon="plus">{{ labels.button.add }}</But>
        </div>
      </div>
      <div class="page__table table">
        <div class="table__head table-head">
          <div class="table__column table-head__column" @click="sortByColumn('date')">
            <span>{{ labels.column.date }}</span>
            <span class="tringle" :class="[{ 'tringle_selected': sortBy.column === 'date' }]"/>
          </div>
          <div class="table__column table-head__column" @click="sortByColumn('type')">
            <span>{{ labels.column.operation }}</span>
            <span class="tringle" :class="[{ 'tringle_selected': sortBy.column === 'operationTypeTranslation' }]"/>
          </div>
          <div class="table__column table-head__column">
            <span>{{ labels.column.culture }}</span>
          </div>
          <div class="table__column table-head__column" @click="sortByColumn('assessment')">
            <span>{{ labels.column.assessment }}</span>
            <span class="tringle" :class="[{ 'tringle_selected': sortBy.column === 'assessment' }]"/>
          </div>
        </div>
        <div class="table__body table-body">
          <div
            class="table__row table__row_selectable"
            v-for="(item, index) in computedOpertaions"
            :key="index"
            @click="$router.push({ name: 'OperationEdit', params: { id: item.id, ...params } })">
            <div class="table__column">{{ convertDatetime(item.date, { unix: false }) }}</div>
            <div class="table__column table__column_primary">{{ translationClass[OperationTypeClass[item.type]] }}</div>
            <div class="table__column">
              <div class="culture">
                <img class="culture__img" src="img/CropCorn.png"/>
                <span class="culture__label">{{ labels.culture.default  }}</span>
              </div>
            </div>
            <div class="table__column assessment" :class="[{ 'assessment_empty': item.assessment === null }]">
              <span class="assessment__bullet" :class="['assessment_bullet' + item.assessment]"></span>
              <!-- <span>{{ item.assessment !== null ? item.assessmentTranslation : 'Нет оценки' }}</span> -->
              <span>{{ item.assessment !== null ? translationClass[AssessmentClass[item.assessment]] : 'Нет оценки' }}</span>
            </div>
          </div>
        </div>
      </div>
    </template>
    <!-- Модальное окно -->
    <template class="view" slot="child" v-if="params.collection">
      <router-view :key="params.collection"/>
    </template>
  </Page>
</template>

<script lang="ts">
import Vue from 'vue'

import Operation, { OperationType, Assessment } from '@/models/Operation'
import translation from '@/locales/intterra-ru-RU.json'

import FieldService from '@/FieldService'
const FieldServiceClass = new FieldService()

interface ParamsInterface {
  collection: string;
  parent?: object | null;
}

interface TriggersInterface {
  planed?: boolean;
  complited?: boolean;
}

interface SortByInterface {
  default: string;
  column?: string | null;
}

export default Vue.extend({
  name: 'Operations',
  components: {
    Page: () => import('@/components/templates/Page.vue'),
    But: () => import('@/components/ui/But.vue')
  },
  computed: {
    translationClass () {
      return JSON.parse(JSON.stringify(translation)) // Валидируем JSON-объект
    },
    OperationTypeClass () {
      return OperationType // Определяем переменную для того чтобы использолвать в "template"
    },
    AssessmentClass () {
      return Assessment // Определяем переменную для того чтобы использолвать в "template"
    },
    operations (): Array<Operation> {
      return this.$store.getters.collection(this.params.collection) // Поулчаю данные из центрального храниища
    },
    computedOpertaions (): Array<Operation> {
      let output = this.operations || [] // назначаю переменную. Применяю операнд "или", для случая если данных в "центральном хранилище" еще нет

      // Назначаю переменую для сортировки. в случае если целевое значение отсутствует, применяю стандартное.
      const sortBy: string = this.sortBy.column || this.sortBy.default
      output.sort((a: Operation, b: Operation): number => {
        if (sortBy === 'date') {
          // Сравниваю время элеменотов сортировки по их timestamp значению
          const unix = true
          return (this.convertDatetime(a[sortBy], { unix }) > this.convertDatetime(b[sortBy], { unix }) ? 1 : -1) || undefined
        } else if (sortBy === 'type') {
          // Сортируем список по названию операций в алфавитном порядке. Переводим переменные
          const sortA = this.translationClass[OperationType[a[sortBy]]]
          const sortB = this.translationClass[OperationType[b[sortBy]]]
          return sortA > sortB ? 1 : -1
        } else if (sortBy === 'assessment') {
          // Сортируем список по оценки, приводим переменные к интерфейсу "Assessment"
          const sortA = a[sortBy] as Assessment
          const sortB = b[sortBy] as Assessment
          return sortA === null ? 1 : sortB === null ? -1 : sortA.toString().localeCompare(sortB.toString())
        } else {
          return a > b ? 1 : -1
        }
      })

      // Если тригер "запланированно" включен и имеет значение "true", то фильтрую существующий массив и оставляю только значению где "нет оценки".
      if (this.triggers.planed) {
        output = (output as Array<Operation>).filter((x: Operation) => x.assessment === null)
      }

      // Если тригер "выполенно" включен и имеет значение "true", то фильтрую существующий массив и оставляю только значению где "есть оценка".
      if (this.triggers.complited) {
        output = (output as Array<Operation>).filter((x: Operation) => x.assessment !== null)
      }

      return output
    }
  },
  data () {
    return {
      params: {
        collection: 'operations',
        parent: {
          type: 'Поле',
          id: 112
        }
      } as ParamsInterface,
      triggers: {
        planed: false,
        complited: false
      } as TriggersInterface,
      labels: {
        headline: 'Операция на поле',
        column: {
          date: 'Дата',
          operation: 'Операция',
          culture: 'Культура',
          assessment: 'Качество'
        },
        culture: {
          default: 'Пшеница озимовая'
        },
        button: {
          add: 'Добавить операцию'
        }
      },
      buttons: [
        {
          trigger: 'planed',
          text: 'Запланированные операции'
        },
        {
          trigger: 'complited',
          text: 'Выполненные операции'
        }
      ],
      sortBy: {
        default: 'id',
        column: null
      } as SortByInterface,
      options: {
        date: {
          unix: false,
          locale: 'ru',
          format: {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          }
        }
      }
    }
  },
  methods: {
    convertDatetime ({ year = 0, month = 0, day = 0 }, { unix = false }) {
      const { locale, format } = this.options.date
      // Задаю стандартные значение через "деструктуризацию" аргументов функции
      const output = new Date(year, month, day) // Созадаю новый обеъе Date
      // Исходя из переменой "unix" определяю, какой формат врмени мне нужно получить "timestamp" или "строковеой представление".
      return unix ? output.getTime() : output.toLocaleString(locale, format)
      // return output.toLocaleString(locale, format)
    },
    switchTrigger (target: keyof TriggersInterface) {
      // Функция для определения будущего состояния списка, исходя из выбора "тригера".
      // Перебираю все "тригеры" по их ключам.
      Object.keys(this.triggers).forEach((key) => {
        if (key !== target) {
          // Если "ключ" не соответствует значению агргумента функции "target", то отлючаю такой тригер, с целю того чтобы включенным отался только один.
          this.triggers[key as keyof TriggersInterface] = false
        } else {
          // В случае соответствия "ключа" значению аргументу функции "trarget", меняю значению с текущего на противоположное.
          this.triggers[target] = !this.triggers[target]
        }

        this.triggers[target] = !this.triggers[target]
      })
    },
    sortByColumn (name: string) {
      this.sortBy.column = this.sortBy.column === name ? null : name // Определяю значение для перменной, применяемой для сортировки списка (таблицы).
    }
  },
  beforeRouteEnter (to, from, next) {
    next(async vm => {
      const data = await FieldServiceClass.getOperations() // Получаю список операций
      vm.$store.dispatch('uploadCollection', { data, ...vm.$data.params }) // Записываю полученные данные в центральное хранилище
    })
  }
})
</script>

<style lang="scss" scoped>
  .page {
    &__table {
      width: 100%;
    }

    &__toolbar {
      margin: 16px 0;
    }
  }

  .headline {
    font-weight: 500;
    font-size: 25px;
  }

  .toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__trigger {
      text-transform: uppercase;
      display: inline;
      cursor: pointer;
      font-size: 11px;
      font-weight: 500;
      margin: 16px 0;

      &:not(:last-child) {
        margin-right: 16px;
      }

      &_selected {
        color: var(--color-blue);
      }
    }
  }

  .assessment {
    &_empty {
      opacity: 0.3;

      .bullet {
        background-color: var(--color-black);
      }
    }

    &__bullet {
      display: inline-block;
      width: 12px;
      height: 6px;
      border-radius: 3px;
      margin-right: 8px;
    }

    &__bullet_0 {
      background-color: green;
    }

    &__bullet_1 {
      background-color: yellow;
    }

    &__bullet_2 {
      background-color: red;
    }
  }

  .table-head {
    &__column {
      font-weight: 500;
      cursor: pointer;

      span:not(:last-child) {
        margin-right: 8px;
      }
    }
  }

  .table-body {
    &__column {
      font-weight: normal;
      border-bottom: 1px solid var(--color-lightgray);
    }
  }

  .table {
    display: table;
    border-spacing: 0;

    &__head {
      display: table-header-group;
      background-color: var(--color-lightgray);
    }

    &__body {
      display: table-row-group;
    }

    &__row {
      display: table-row;

      &_selectable {
        cursor: pointer;

        &:hover {
          .table__column {
            background-color: var(--color-puregray);
          }
        }
      }
    }

    &__column {
      display: table-cell;
      padding: 16px 12px;
      vertical-align: middle;
      font-size: 11px;

      &_primary {
        font-weight: 500;
        font-size: 13px;
      }
    }
  }

  .culture {
    display: inline-flex;
    align-items: center;

    & > *:not(:last-child) {
      margin-right: 12px;
    }
  }

  .tringle {
    position: relative;
    top: 11px;
    width: 0;
    height: 0;
    border: 0 solid transparent;
    border-left-width: 5px;
    border-right-width: 5px;
    border-top: 5px solid #A7A9AC;

    &_selected {
      border-top-color: var(--color-blue);
    }
  }
</style>

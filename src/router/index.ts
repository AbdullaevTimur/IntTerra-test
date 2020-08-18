import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Operations',
    component: () => import('@/views/Operations.vue'), // Применяю lazy-load для загрузки копонента
    children: [
      {
        path: 'add',
        name: 'OperationAdd',
        component: () => import('@/views/operations/Form.vue'), // Применяю lazy-load для загрузки копонента
        meta: {
          method: 'add' // Перменная необходимая для определения целевого действия, выполняего пользоватлеем. ("Создание модели")
        }
      },
      {
        path: 'edit',
        name: 'OperationEdit',
        component: () => import('@/views/operations/Form.vue'), // Применяю lazy-load для загрузки копонента
        meta: {
          method: 'edit' // Перменная необходимая для определения целевого действия, выполняего пользоватлеем. ("Редактирование модели")
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router

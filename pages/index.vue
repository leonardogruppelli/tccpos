<template>
  <div>
    <panel title="Things">
      <div class="table">
        <div class="table__container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>E-mail</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in stuff"
                :key="item.id"
              >
                <td>{{ item.name }}</td>
                <td>{{ item.email }}</td>
                <td>{{ item.role }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="table__actions">
          <ul class="table__actions__list">
            <li class="table__actions__item table__actions__item--add">
              <button
                @click.stop="open('add')"
                aria-label="Add item"
              >
                <icon
                  icon="plus"
                  class="add"
                />
              </button>
            </li>

            <li
              v-for="item in stuff"
              :key="item.id"
              class="table__actions__item"
            >
              <button aria-label="Edit item">
                <icon
                  icon="pen"
                  class="edit"
                />
              </button>

              <button aria-label="Delete item">
                <icon
                  icon="trash"
                  class="delete"
                />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </panel>

    <!-- ADD MODAL -->
    <transition name="modal">
      <modal
        v-if="modal.add"
        @close="close('add')"
      
        title="Add stuff"
      >
        <validation-observer
          ref="observer"
          class="form form--two"
        >
          <validation-provider
            v-slot="{ classes, errors }"
            rules="required"
          >
            <control
              v-model="add.name"
              label="name"
              prefix="user"
              :classes="classes"
              :error="errors[0]"
            />
          </validation-provider>

          <validation-provider
            v-slot="{ classes, errors }"
            rules="required|email"
          >
            <control
              v-model="add.email"
              label="e-mail"
              prefix="at"
              :classes="classes"
              :error="errors[0]"
            />
          </validation-provider>

          <validation-provider
            v-slot="{ classes, errors }"
            rules="required"
          >
            <control
              v-model="add.role"
              label="role"
              prefix="project-diagram"
              select
              :options="add.roles"
              :classes="classes"
              :error="errors[0]"
            />
          </validation-provider>

          <validation-provider
            v-slot="{ classes, errors }"
            rules="required"
          >
            <control
              v-model="add.agency"
              label="role"
              prefix="network-wired"
              select
              :options="add.agencies"
              :classes="classes"
              :error="errors[0]"
            />
          </validation-provider>

          <validation-provider
            v-slot="{ classes, errors }"
            rules="required"
          >
            <control
              v-model="add.status"
              label="role"
              prefix="signal"
              select
              :options="add.statuses"
              :classes="classes"
              :error="errors[0]"
            />
          </validation-provider>
        </validation-observer>
      </modal>
    </transition>
  </div>
</template>

<script>
import Panel from '~/components/organisms/panel'
import Modal from '~/components/organisms/modal'
import {
	ValidationObserver,
	ValidationProvider 
} from 'vee-validate'
import Control from '~/components/molecules/control'

export default {
	components: {
		Panel,
		Modal,
		ValidationObserver,
		ValidationProvider,
		Control
	},
	data() {
		return {
			stuff: [
				{
					id: 1,
					name: 'John Doe',
					email: 'john@gmail.com',
					role: 'Developer'
				},
				{
					id: 2,
					name: 'Foo Bar',
					email: 'foo@gmail.com',
					role: 'Designer'
				},
				{
					id: 3,
					name: 'Jenny Foe',
					email: 'jenny@gmail.com',
					role: 'Designer'
				},
				{
					id: 4,
					name: 'Harry Potter',
					email: 'harry@gmail.com',
					role: 'Developer'
				},
				{
					id: 5,
					name: 'Christine Muspi',
					email: 'christine@gmail.com',
					role: 'Human Resources'
				}
			],
			modal: {
				add: false,
				update: false
			},
			add: {
				name: null,
				email: null,
				role: null,
				agency: null,
				status: null,
				roles: [
					'Developer',
					'Designer'
				],
				agencies: [
					'Prodigious',
					'MelhorEnvio',
					'Possible',
					'Nodo',
					'Nave',
					'Brainny'
				],
				statuses: [
					'on',
					'off'
				]
			}
		}
	},
	methods: {
		open(modal) {
			this.modal[modal] = true
		},
		close(modal) {
			this.modal[modal] = false
		}
	}
}
</script>
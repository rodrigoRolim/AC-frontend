<template>
  <v-app>
  <mask-load v-if="showMask"></mask-load>
   <ac-navbar>
      <v-toolbar-items>
        <v-btn color="secondary" dark depressed to="/professor/home">alunos<v-icon class="ml-2">fa-graduation-cap</v-icon></v-btn>
       <v-menu
        transition="slide-y-transition"
        bottom
        >
          <template v-slot:activator="{ on }">
            <v-btn
              class="purple"
              color="blue-grey"
              depressed
              dark
              v-on="on"
            >
              menu <v-icon dark right>menu</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-tile to="/admin/cursos">
              <v-list-tile-title>cursos</v-list-tile-title>
            </v-list-tile>
            <v-list-tile to="/admin/departamentos">
              <v-list-tile-title>departamentos</v-list-tile-title>
            </v-list-tile>
            <v-list-tile to="/admin/professores">
              <v-list-tile-title>professores</v-list-tile-title>
            </v-list-tile>
            <v-list-tile to="/admin/grupos">
              <v-list-tile-title>grupos</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        <v-btn color="error" depressed  @click="logout()">sair<i class="material-icons">exit_to_app</i></v-btn>
      </v-toolbar-items>
    </ac-navbar>
    <v-layout class="table">
     <v-alert
        class="alert"
        :type="typeAlert"
        :value="showAlert"
        >
        {{message}}
      </v-alert>
    <v-toolbar flat color="white">
      <v-toolbar-title>Lista de grupos</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="secondary" depressed dark class="mb-2" v-on="on">Novo grupo</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex md12>
                    <v-text-field 
                    v-model="editedItem.name" 
                    label="Nome do grupo"
                    :rules="validations"
                    ></v-text-field>
                  </v-flex>
                   <v-flex md12>
                    <v-text-field 
                    v-model="editedItem.description" 
                    label="Descrição do grupo"
                    :rules="validations"
                    ></v-text-field>
                  </v-flex>
                  <v-flex md12>
                    <v-text-field 
                    type="number"  
                    v-model="editedItem.scoreMin" 
                    label="Pontuação mínima"
                    :rules="validations"
                    ></v-text-field>
                  </v-flex>
                  <v-flex md12>
                    <v-text-field 
                    type="number" 
                    v-model="editedItem.scoreMax" 
                    label="Pontuação máxima"
                    :rules="validations"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error" depressed @click="close">Cancel</v-btn>
              <v-btn color="secondary" :disabled="validated" depressed @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
    </v-toolbar>
    <v-card>
      <v-card-title>
        Grupos
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
      :headers="headers"
      :items="groups"
      :expand="expand"
      hide-actions
      :pagination.sync="pagination"
      item-key="name"
      >
      <template v-slot:items="props">
        <tr @click="props.expanded = !props.expanded">
          <td>{{ props.item.name }}</td>
          <td class="text-xs-left">{{ props.item.scoreMin }}</td>
          <td class="text-xs-left">{{ props.item.scoreMax }}</td>
          <td class="text-xs-left">{{ props.item.description }}</td>
          <td class="justify-center layout px-3">
            <add-item @refresh="reloadTable" :group="props.item"></add-item>
            <v-icon
              small
              class="mr-2"
              @click="editItem(props.item)"
            >
              edit
            </v-icon>
            <v-icon
              small
              class="mr-2"
              @click="deleteItem(props.item)"
            >
              delete
            </v-icon>
          </td>
        </tr>
      </template>
      <template v-slot:expand="props">
        <div id="itens">
        <v-card flat v-for="item in props.item.items" :key="item._id" >
          <v-card-text class="item"><span class="format-text">{{item.description}}</span>
            <edit-item :item="item" :idGroup="props.item._id" class="edit mr-2" small></edit-item>
            <v-icon class="mr-2" small dark color="secondary" @click="removeItem(props.item, item)">delete</v-icon>
          </v-card-text>
        </v-card>
        </div>
      </template>
       <template v-slot:no-results  >
          <v-alert :value="true" color="error" icon="warning">
            Sua pesquisa para "{{ search }}" não obteve resultados.
          </v-alert>
        </template>
        <template v-slot:no-data>
          <v-alert :value="true" color="error" icon="warning">
            nenhum grupo cadastrado
          </v-alert>
        </template>
    </v-data-table>
    <div class="text-xs-center pt-0">
      <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
    </div>
    </v-card>
    </v-layout>
  </v-app>
</template>

<script>
import AcNavbar from '../AcNavbar'
import MaskLoad from '../MaskLoad'
import AddItem from '../AddItem'
import EditItem from '../EditItem'
import GroupService from '@/services/Group.js'
  export default {
    components: { AcNavbar, MaskLoad, AddItem, EditItem },
    data () {
      return {
        showMask: false,
        expand: false,
        dialog: false,
        editedIndex: -1,
        search: '',
        message: '',
        typeAlert: 'error',
        showAlert: false,
        validations: [
          v => !!v || 'Campo obrigatório*'
        ],
        pagination: {
          rowsPerPage: 6,
          page: 1
        }, 
        editedItem: {
          name: '',
          description: '',
          scoreMin: 0,
          scoreMax: 0,
          items: []
        },
        defaultItem: {
          name: '',
          description: '',
          scoreMin: 0,
          scoreMax: 0,
          items: []
        },
        headers: [
          {
            text: 'Grupo (atividades complementares)',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'pontuação mínima', value: 'minimo', sortable: false, align: 'left' },
          { text: 'pontuação máxima', value: 'maximo', sortable: false, align: 'left' },
          { text: 'descrição', value: 'description', sortable: false, align: 'left' },
          {text: 'ações', value: 'name', sortable: false, align: 'center' }
        ],
        groups: []
      }
    },
    created () {
      this.showMask = true
      this.initializeGroup()
    },
    computed: {
      pages () {
        this.pagination.totalItems = this.groups.length
        if (this.pagination.rowsPerPage == null ||
          this.pagination.totalItems == null
        ) {
            return 0
          } 
        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      },
      formTitle () {
        return this.editedIndex === -1 ? 'Novo grupo' : 'Editar grupo'
      },
      validated () {
        return this.editedItem.name == '' ||  
               this.editedItem.description == '' || 
               this.editedItem.scoreMin == 0 ||
               this.editedItem.scoreMax == 0 
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },
    methods: {
      reloadTable (value) {
        if (value) {
          this.getAlert('success', 'Item adicionado com sucesso')
          this.initializeGroup()
        } else {
           this.getAlert('error', 'não foi possível adicionar o item')
        }
      },
      initializeGroup () {
        GroupService.readAll()
          .then((res) => res.data)
          .then((groups) => {
            this.groups = groups
            return
          })
          .then(() => setTimeout(() => { this.showMask = false }, 1000))
          .catch((err) =>  this.getAlert('error', 'ocorreu um erro ao tentar inicilizar os grupos'))
      },
      logout () {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        this.$router.replace('/professor')
      },
      editItem (item) {
        this.editedIndex = this.groups.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const response = confirm('Tem certeza disso?')
        if (response) {
          GroupService.deleteGroup(item._id)
          .then((res) => {
            const index = this.groups.indexOf(item)
            this.groups.splice(index, 1)
            return 
          })
          .then(() => this.getAlert('success', 'item deletado com sucesso'))
          .catch((err) => this.getAlert('error', 'não foi possível deletar o item'))
        }
     
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      removeItem (group, item) {
        const userResponse = confirm('tem certeza que você deseja excluir este item?')
        if (userResponse) {
          GroupService.removeItem(group._id, item)
            .then((res) => {
  
              const indexGroup = this.groups.indexOf(group)
              const indexItem = this.groups[indexGroup].items.indexOf(item)
              this.groups[indexGroup].items.splice(indexItem, 1)
              return 
            })
            .then(() => this.getAlert('success', 'deletado com sucesso'))
            .catch((err) =>  this.getAlert('error', 'não foi possível deletá-lo'))
        }
      },
      save () {
        if (this.editedIndex > -1) {
          
          GroupService.updatingGroup(this.editedItem._id, this.editedItem)
            .then((res) => this.getAlert('success', 'atualizado com sucesso'))
            .then(() => Object.assign(this.groups[this.editedIndex], this.editedItem))
            .catch((err) =>  this.getAlert('error', 'não foi possível atualizá-lo'))
          
        } else {
          GroupService.addGroup(this.editedItem)
            .then((res) => this.groups.push(res.data))
            .then(() => this.getAlert('success', 'cadastrado com sucesso'))
            .catch((err) =>  this.getAlert('error', 'não foi possível salvá-lo'))
        }
        this.close()
      },
      getAlert (type, message) {
        this.typeAlert = type
        this.message = message
        this.showAlert = true
        setTimeout(() => {
          this.showAlert = false
        }, 5000)
      }
    }
  }
</script>
<style>
.table {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  width: 90%;
  margin: 0 auto;
  height: 70vh;
}
.item {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  word-break: break-all;  
}
.format-text {
  margin: 0;
  padding: 0;
  width: 70%;
}
.alert {
  width: 100%;
}
#itens {
  background-color: rgba(0,0,0,0.05);
  max-height: 32vh;
  overflow: auto;
}
</style>
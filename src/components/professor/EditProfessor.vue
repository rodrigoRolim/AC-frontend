<template>
  <v-app>
    <v-layout justify-center class="container">
      <v-flex xs12 sm10 md8 lg6>
       <v-alert
        :value="showAlert"
        :type="alert"
        >
        {{ messageAlert }}
       </v-alert>
        <v-form ref="form">
          <v-card >
          
            <v-card-text>
              <v-text-field
                ref="name"
                v-model="student.name"
                :rules="[() => !!student.name || 'This field is required']"
                :error-messages="errorMessages"
                label="Nome completo"
                placeholder="John Doe"
                required
              ></v-text-field>
              <v-text-field
                ref="email"
                v-model="student.email"
                :error-messages="errorMessages"
                :rules="[rules.required, rules.email]"
                label="Email*"
                placeholder="nome@email.com"
                required
              ></v-text-field>
              <v-text-field
                ref="siape"
                v-model="student.ra"
                :error-messages="errorMessages"
                :rules="[() => !!student.ra || 'This field is required']"
                label="Registro acadêmico (SIAPE)*"
                placeholder="a122345"
                required
              ></v-text-field>    
              <v-autocomplete
                ref="Graduações"
                v-model="student.graduation"
                :error-messages="errorMessages"
                :rules="[() => !!student.graduation || 'This field is required']"
                :items="graduationsNames"
                label="Graduação"
                placeholder="Select..."
                required
              ></v-autocomplete>
              <v-text-field
                :append-icon="show ? 'visibility' : 'visibility_off'"
                :rules="[rules.required]"
                :error-messages="errorMessages"
                :type="show ? 'text' : 'password'"
                name="input-10-2"
                label="Crie uma senha"
                hint="deve ter pelo menos 8 caracteres"
                v-model="student.password"
                class="input-group--focused"
                @click:append="show = !show"
              ></v-text-field>
            </v-card-text>
            <v-divider class="mt-5"></v-divider>
            <v-card-actions class="justify-end">
              <v-btn color="success" dark depressed to="/aluno">voltar</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="secondary" dark depressed @click="reset">Resetar</v-btn>
              <v-btn color="primary" dark depressed @click="createStudent">Submit</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
export default {
  
}
</script>

<style scoped>

</style>
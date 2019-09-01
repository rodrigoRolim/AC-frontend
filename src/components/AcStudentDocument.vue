<template>
  <div class="files">
    <h2>Documentos</h2>
    <div class="container-file">
      <div class="wrap-file">
        <div class="header">
          <span>nome do documento</span>
          <div class="controls">
            <div class="delete"><i class="far fa-trash-alt"></i></div>
            <div class="edit"><i class="far fa-edit"></i></div>
            <div class="visualize"><i class="far fa-eye"></i></div>
          </div>
        </div>
        <div class="container-img">
          <img src="../assets/horas-atividades-complementares.png" alt="">
        </div>
      </div>
      <div class="wrap-file">
        <div class="header">
          <span>nome do documento</span>
          <div class="controls">
            <div class="delete"><i class="far fa-trash-alt"></i></div>
            <div class="edit"><i class="far fa-edit"></i></div>
            <div class="visualize"><i class="far fa-eye"></i></div>
          </div>
        </div>
        <div class="container-img">
          <img src="../assets/horas-atividades-complementares.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
.files {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 10vh;
  width: 90%;
  margin: 10px auto;
}
.container-img img { width: 90%;}
.container-file {
  display: flex;
  flex-direction: column;
}
.wrap-file {
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  width: 100%;
  margin-bottom: 3px;
}
.container-table {
  display: flex;
}
.container-list {
  display: none;
}
.container-img {
  border-top: 1px solid #ddd;
  border-radius: 3px;
}
h2 {
  margin: 10px auto;
}
.edit, .delete, .visualize { cursor: pointer; }
.edit {
  border-right: 1px solid #ddd;
  padding: 10px;
}
.delete {
  border-right: 1px solid #ddd;
  border-left: 1px solid #ddd;
  padding: 10px 12.5px;
}
.visualize {
  padding: 10px;
}
.header, .controls {
  display: flex;
  flex-direction: row;
}
.header {
  justify-content: space-between;
}
span {
  align-self: center;
  width: 100%;
  text-align: center;
}
</style>
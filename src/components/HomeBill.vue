<template>
     <div class="col s12 m6 l4">
      <div class="card light-blue bill-card">
        <div class="card-content white-text">
          <span class="card-title">Счет в валюте</span>

          <p class="currency-line">
            <span>12.0 Р</span>
          </p>
        </div> 
      </div>
    </div>
</template>
<script>
export default {
  props:['rates'],
  computed:{
    // base(){
    //   return this.#store.getters.info.bill/(this.rates['RUB']/this.rates['EUR'])
    // }
  }
}
</script>
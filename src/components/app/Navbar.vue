<template>
    <nav class="navbar orange lighten-1">
      <div class="nav-wrapper">
        <div class="navbar-left">
          <a href="#" @click.prevent="$emit('click')">
            <i class="material-icons black-text">dehaze</i>
          </a>
          <span class="black-text">{{date | date('datetime')}}</span>
        </div>

        <ul class="right hide-on-small-and-down">
          <li>
            <a
                class="dropdown-trigger black-text"
                href="#"
                data-target="dropdown"
                ref="dropdown"
            >
              {{userName}}
              <i class="material-icons right">arrow_drop_down</i>
            </a>

            <ul id='dropdown' class='dropdown-content'>
              <li>
                <router-link  to="/profile" class="black-text">
                  <i class="material-icons">account_circle</i>Профиль
                </router-link>
              </li>
              <li class="divider" tabindex="-1"></li>
              <li>
                <a href="#" class="black-text" @click.prevent="logout">
                  <i class="material-icons">assignment_return</i>Выйти!
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
</template>
<script>
export default {
  data: () =>({
    userName:'',
    date: new Date(),
    interval: null,
    dropdown: null
  }),
  methods:{
   async logout(){
      await this.$store.dispatch('logout')
      console.log('Logout')
      this.$router.push('/login?message=logout')
    }
  },
  async mounted(){
    this.userName = localStorage.getItem('ActiveUser')
    this.interval = setInterval(()=>{
      this.date = new Date()
    },100000)
    console.log(this.$refs)
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: true
    })
     
    console.log(' CALL mounted  this.$store.getters.activeuser', this.$store.getters.activeuser)               
    // this.userName = this.$store.getters.activeuser 
    console.log('this.$store.getters.activeuser', this.$store.getters.activeuser)
    // debugger
       

  },
  beforeDestroy(){
    console.log('before destroy')
    clearInterval(this.interval)
    if (this.dropdown && this.dropdown.destroy){
      this.dropdown.destroy()
    }
  }
}
</script>
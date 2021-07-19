const store = {
  data(){
    return{
      navBar: false,
      Dark: false,
      user:{
        name: null,
        avatar: null,
        alias: null,
        email: null,
        bioInfo: null,
        creado: null,
        giturl: null,
        countPublicRepos: 0,
        urlPublicRepos: null,
        repos:[],
      },
      urlGit: "https://api.github.com/users/19yisus",
      token: "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",
    }
  },
  methods:{
    async GetDatosUserFromGit(){
      await fetch(`${this.urlGit}`,{
        headers:{
          'Authorization': `Token ${this.token}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }      
      }).then( (response) => response.json()).then( res =>{
        this.user.name = res.name;
        this.user.avatar = res.avatar_url;
        this.user.alias = res.login;
        this.user.email = res.email;
        this.user.bioInfo = res.bio;
        this.user.creado = res.created_at;
        this.user.giturl = res.html_url;
        this.user.countPublicRepos = res.public_repos;
        this.user.urlPublicRepos = res.repos_url
      })
    },
    async GetDatosRepo(){
      await fetch(`${this.urlGit}/repos`).then( response => response.json()).then( res =>{
        this.user.repos = res;
      })
    },
    DarkMode(){
      let htmlClasses = document.querySelector('html').classList;
      if(localStorage.theme == 'dark') {
        this.Dark = false;
        htmlClasses.remove('dark');
        localStorage.removeItem('theme')
      } else {
        this.Dark = true;
        htmlClasses.add('dark');
        localStorage.theme = 'dark';
      }
    },
    displayNavbar(){
      let nav = document.getElementById("navbar");
      nav.classList.toggle("hidden")
      nav.classList.toggle("flex")
    }
  },
  async mounted(){
    if (localStorage.theme === 'dark' || (!'theme' in localStorage && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.querySelector('html').classList.add('dark')
      this.Dark = true;
    }else if (localStorage.theme === 'dark') {
      document.querySelector('html').classList.add('dark')
      this.Dark = true;
    }

    await this.GetDatosUserFromGit()
    await this.GetDatosRepo()    
  }
};

Vue.createApp(store).mount('#app');

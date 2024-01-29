<script>

export default {
    name:'Header',
    data(){
        return {
            showMenu: false
        }

    },
    methods: {
        showOffcanvasMenu(){
            this.showMenu ? this.showMenu = false : this.showMenu = true;
        }
    }
}
</script>

<template>
    <header>
        <div class="container d-flex justify-content-between">
                <div class="logo">
                    <div>
                        <router-link :to="{name: 'home'}">
                            <img src="/public/Boolbnb_logo.webp" alt="" class="rounded-circle">
                        </router-link>
                        
                    </div>
                </div>
                <div class="navbar">
                    <nav>
                        <ul class="d-flex align-items-center">
                            <!-- <li>
                                <router-link :to="{name: 'home'}">Home</router-link>
                            </li> -->
                            <li class="mx-4">
                                <router-link :to="{name: 'ricerca'}">Ricerca avanzata</router-link>
                            </li>
                            <li>
                                <a href="#">Contatti</a>
                            </li>
                            <li class="mx-4">
                                <!-- <router-link :to="{name: 'accedi'}">Accedi</router-link> -->

                                <a href="http://127.0.0.1:8000/admin"><i class="fa-regular fa-circle-user"></i> Area Riservata</a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <!-- Hamburger menu -->
                <!-- <div class="hamburger-menu" >
                    <input id="menu__toggle" type="checkbox" />
                    <label class="menu__btn" for="menu__toggle">
                    <span></span>
                    </label>
                    <ul class="menu__box">
                        <li>
                            <router-link class="menu__item text-light" :to="{name: 'home'}">Home</router-link>
                        </li>
                        <li>
                            <router-link class="menu__item text-light" :to="{name: 'ricerca'}">Ricerca avanzata</router-link>
                        </li>
                        <li>
                            <a class="menu__item text-light" href="#">Contatti</a>
                        </li>
                        <li>
                            <a class="menu__item text-light" href="http://127.0.0.1:8000/admin"><i class="fa-regular fa-circle-user"></i> Area Riservata</a>
                        </li>
                    </ul>
                </div> -->
                <!-- End Hamburger menu -->
                
                <div id="app" class="hamburger-menu"> 
                    <div class="container">
                        <span class="float-end">
                            <button class="navbar-toggler" type="button" @click.prevent="showOffcanvasMenu()">
                                <span class="navbar-toggler-icon">&#9776;</span>
                            </button>
                        </span>
                    </div>
                    <div class="offcanvas offcanvas-end" :class="showMenu ? 'show' : ''" tabindex="-1" :style="{ visibility: showMenu ? 'visible' : 'hidden' }">
                        <div class="offcanvas-header">
                            <h5 class="offcanvas-title" id="">Menu</h5>
                            <a type="button" class="btnx text-reset" @click.prevent="showOffcanvasMenu()"><i
                            class="fa-regular fa-circle-xmark"></i></a>
                        </div>
                        <div class="offcanvas-body">
                            <ul>
                                <li>
                                    <router-link :to="{name: 'home'}" @click.prevent="showOffcanvasMenu()">Home</router-link>
                                </li>
                                <li>
                                    <router-link :to="{name: 'ricerca'}" @click.prevent="showOffcanvasMenu()">Ricerca avanzata</router-link>
                                </li>
                                <li>
                                    <a href="#" @click.prevent="showOffcanvasMenu()">Contatti</a>
                                </li>
                                <li>
                                    <a href="http://127.0.0.1:8000/admin">Area Riservata</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
        </div>
    </header>
</template>

<style lang="scss" scoped>

header {
    height: 70px;
    width: 100%;
    background-color: white;
    position: fixed;
    z-index: 10000;
    .logo {
        img {
            width: 70px;
            //padding: 3px;

        }
    }
    .navbar {
        ul {
            margin: 0;
            padding: 0;
            li {
                a {
                    color: #146C94;
                }
            }
        }
    }
}

</style>
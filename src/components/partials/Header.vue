<script>
export default {
    name:'Header'
}
</script>

<template>
    <header>
        <div class="container d-flex justify-content-between">
                <div class="logo">
                    <div>
                        <router-link :to="{name: 'home'}">
                            <img src="/public/Boolbnb logo.png" alt="">
                        </router-link>
                        
                    </div>
                </div>
                <div class="navbar">
                    <nav>
                        <ul class="d-flex align-items-center">
                            <li>
                                <router-link :to="{name: 'home'}">Home</router-link>
                            </li>
                            <li class="mx-4">
                                <router-link :to="{name: 'ricerca'}">Cerca appartamenti</router-link>
                            </li>
                            <li>
                                <!-- <router-link :to="{name: 'accedi'}">Accedi</router-link> -->
                                <a href="http://127.0.0.1:8000/login">Accedi</a>
                            </li>
                            <li class="ms-4">
                                <!-- <router-link :to="{name: 'registrati'}">Registrati</router-link> -->
                                <a href="http://127.0.0.1:8000/register">Registrati</a>
                            </li>
                        </ul>
                    </nav>
                </div>

        </div>
    </header>
</template>

<style lang="scss" scoped>

header {
    height: 60px;
    background-color:#F6F1F1;
    border-bottom: 1px solid #146C94 ;
    .logo {
        img {
            width: 20%;
            padding: 3px;
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
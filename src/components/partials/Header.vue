<script>
export default {
    name:'Header'
}
</script>

<template>
    <header>
        <div class="container d-flex justify-content-between my-3">
                <div class="logo">
                  <p>
                    logo
                  </p>
                </div>
                <div class="navbar">
                    <nav>
                        <ul class="d-flex">
                            <li>
                                <router-link :to="{name: 'home'}">Home</router-link>
                            </li>
                            <li class="mx-4">
                                <router-link :to="{name: 'ricerca'}">Cerca appartamenti</router-link>
                            </li>
                            <li>
                                <router-link :to="{name: 'accedi'}">Accedi</router-link>
                            </li>
                            <li class="ms-4">
                                <router-link :to="{name: 'registrati'}">Registrati</router-link>
                            </li>
                        </ul>
                    </nav>
                </div>

        </div>
    </header>
</template>

<style>

</style>
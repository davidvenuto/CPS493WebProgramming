<script setup lang="ts">
import { getUsers, type User } from '@/model/users';
import { refSession, useLogin } from '@/viewModel/session';
import { ref } from 'vue';

    const session = refSession();

    const users = ref([] as User[])
    getUsers()
        .then((data) => users.value = data.slice(0, 5))
        .catch((error) => console.error(error));
    ;

    const { login, googleLogin, logout } = useLogin();

    function doLogin(user: User) {
        login(user);
    }

    function doLogout() {
        logout();
    }

</script>

<template>
    <div class="badge" v-if="session.user">
        <img :src="session.user.image" alt="Avatar" />
        <div>
            {{ session.user.firstName }} {{ session.user.lastName }} <br />
            {{ session.user.email }}
        </div>
        <div>(
            <a class="is-danger" @click.prevent="doLogout">
                Not You?
            </a>)
        </div>
        
    </div>
    <div class="buttons" v-else>
        <a class="button is-primary">
            <strong>Sign up</strong>
        </a>

        <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">
          Login
        </a>

        <div class="navbar-dropdown">
          <a v-for="user in users" class="navbar-item" @click="doLogin(user)">
            {{ user.firstName }} {{ user.lastName }}
          </a>
          <hr class="navbar-divider" />
            <a class="navbar-item" @click="googleLogin">
                Login with Google
            </a>

        </div>
        

      </div>

    </div>
</template>

<style scoped>
    .badge {
        display: flex;
        align-items: center;
        line-height: 1em;
    }
    .badge img {
        border-radius: 50%;
        margin-right: 0.5em;
    }
</style>
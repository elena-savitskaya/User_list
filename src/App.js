import React from "react"
import AddUser from "./components/AddUser"
import Header from "./components/Header"
import Users from "./components/Users"
// добавляем библиотеку для получения юзеров
import axios from "axios"

const baseUrl = "https://reqres.in/api/users?page=1"

// тут есть список юзеров. его я передаю в компонент юзерс
// в компоненте юзерс я его прописываю как пропс
class App extends React.Component {
    constructor(props) {
        super(props)

        axios.get(baseUrl).then((res => {
            this.setState({users: res.data.data})
        }))

        this.state = {
            users: []
        }

        this.addUser = this.addUser.bind(this)
        this.deleteUser = this.deleteUser.bind(this)
        this.editUser = this.editUser.bind(this)
    }

    render() {
        return (<div>
            <Header title="Users" />
            <main>
                <Users users={this.state.users} onEdit={this.editUser} onDelete={this.deleteUser} />
            </main>
            <aside>
                <AddUser onAdd={this.addUser} />
            </aside>
        </div>)
    }

    // создаем новый метод для удаления юзеров/ 
    // передаем эту функцию в компонент users, далее из компонента users передаем ее в user
    // и уже в компоненте user при нажатии на нужную кнопку мы вызываем этот метод и прописываем параметр id
    
    deleteUser(id) {
        this.setState({
            users: this.state.users.filter((el) => el.id !== id)
        })
    }

    // воздаем метод для редактирования юзеров

    editUser(user) {
        let allUsers = this.state.users
        allUsers[user.id -1] = user

        this.setState({users: []}, () => {
            this.setState({users: [...allUsers]})
        })
    }

    // создаем новый  метод который будет получать новых пользователей и добавлять их
    // и передаем этот метод в компонент AddUser

    addUser(user) {
        console.log(user);
        const id = this.state.users.length + 1;
        this.setState({ users: [...this.state.users, {id, ...user}]}) 
    }
}

export default App

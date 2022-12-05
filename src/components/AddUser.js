import React from "react"

class AddUser extends React.Component {
    userAdd = {}
    constructor(props) {
        super(props)
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
        } 
    }   

        // когда пользователь что-то вводит в форму, мы сохраняем это знаение в стейт, который изначально пустой
        // для чекбокса получаем значение чект
    render() {
        return (
            <form ref={(el) => this.myForm = el}>
                <input placeholder="first_name" onChange={(e) => this.setState({ first_name: e.target.value})} />
                <input placeholder="last_name" onChange={(e) => this.setState({ last_name: e.target.value})} />
                <input placeholder="email" onChange={(e) => this.setState({ email: e.target.value})} />
                <button type="button" onClick={() => {
                    this.myForm.reset()
                    this.userAdd = {
                        first_name: this.state.first_name,
                        last_name: this.state.last_name,
                        email: this.state.email,
                    }
                    if(this.props.user)
                        this.userAdd.id = this.props.user.id
                    this.props.onAdd(this.userAdd)
                }                    
                }>Add</button>
            </form>
        )
    }
}

 export default AddUser


//  после того, как мы научились получать данные, мы должны их как-то добавлять к списку
 
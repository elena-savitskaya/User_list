import React from "react"
import { IoCloseCircleSharp, IoHammerSharp } from 'react-icons/io5'
import AddUser from "./AddUser"


// создадим состояние для редактирования формы

class User extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editForm: false
        }
    }

// / форма будет выводиться только в том случае, если значение true /

    user = this.props.user
    render() {
        return (
            <div className="user">
                
                <IoCloseCircleSharp onClick={() => this.props.onDelete(this.user.id)} className="delete-icon" />
                
                <IoHammerSharp onClick={() => {
                    this.setState({
                        editForm: !this.state.editForm
                    })
                }} className="edit-icon" />
                
                <h3>{this.user.first_name} {this.user.last_name}</h3>
                <img src={this.user.avatar} alt="img" />
                <p>{this.user.email}</p>

                {this.state.editForm && <AddUser user={this.user} onAdd={this.props.onEdit} /> }

            </div>
        )
    }
}

 export default User
 
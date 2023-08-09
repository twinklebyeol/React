import { Component } from "react";


export default class TodoListItem extends Component { 

    state = {
        style:{
            padding: '10px',
            margin: '10px',
        },
    };


    checkitem() { 
        const checkComponet = document.querySelector("#todo-item" + this.props.id);
        if (checkComponet.style.cssText) {
            checkComponet.style.cssText = 0;
        } else {
            checkComponet.style.cssText = "text-decoration: line-through";
         }
        
    }


    
    render() {
        
        return (
            
            <div id={"todo-item" + this.props.id} style={this.state.style}>
                <input type="button" value="✅" onClick={() => { this.checkitem() }} />
                {this.props.text}
                <input type="button" value="❌" onClick={() => { this.props.delete(this.props.id) }} />
                
            </div>

        )
    }
}

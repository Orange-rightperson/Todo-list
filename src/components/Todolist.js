import { render } from '@testing-library/react';
import React from 'react';
import '../assets/css/index.css';
import storage from "../model/storage";
import '../assets/css/bootstrap.css';

class Todolist extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data: "",
            todo: [],
        }
    }

changeChecked=(key)=>{
    var temp = this.state.todo;   
    var check = !temp[key].checked ;
    temp[key].checked = check;
    this.setState({
        todo: temp,
    })
    storage.set("todolist", temp);
}

deleteSth=(key)=>{
    var temp = this.state.todo;
    temp.splice(key, 1);
    this.setState({
        todo: temp,
    })
    storage.remove(key);
}
 
    
submit=(e)=>{
    var title = this.state.data;
    var checked = false;
    if(title)
    {
        var temp={title, checked};
        var donsth = this.state.todo;
        donsth.push(temp);
        this.setState({
            todo: donsth,
        })
        storage.set('todolist', donsth);
        console.log(storage.get('todolist'));
        this.refs.inputsth.value = null;
        this.setState({
            data: null
        })
    }
}

changeData=(e)=>{
    this.setState({
        data: e.target.value,
    })
}

changeDataByKey=(e)=>{
    if(e.keyCode==13)
        {
            var title = this.state.data;
            var checked = false;
            if(title)
            {
                var temp={title, checked};
                var donsth = this.state.todo;
                donsth.push(temp);
                this.setState({
                    todo: donsth,
                })
                storage.set("todolist", donsth);
                console.log(storage.get("todolist"));
                this.refs.inputsth.value = null;
                this.setState({
                    data: null
                })
            }

    }
}

componentDidMount=()=>{
    var temp = storage.get("todolist");
    if(temp)
    {
        this.setState({
        todo : temp
    })
}
}

render(){
    return(
        <div className="todo-list-body">
            <h1 className="title">Todo-list</h1>
            <div className="search-bar">
                <input ref="inputsth"  onChange={this.changeData} onKeyUp={this.changeDataByKey} className="input-bar"></input>
                <button onClick={this.submit} className="add">添加事项</button>
            </div>
            <hr></hr>
            <h2>待办事件</h2>
            <ul>
               {
                    this.state.todo.map((value, key)=>{
                        if(!value.checked)
                        {
                                return(
                                <li key={key}>
                                    {value.title}
                                    <input type="checkbox" checked={value.checked} onChange={this.changeChecked.bind(this,key)}></input>
                                    <button onClick={this.deleteSth.bind(this,key)} className="btn btn-primary">删除</button>
                                </li>
                            )
                        }
                    })
                }
            </ul>
            <hr></hr>
            <h2>已办事件</h2>
            <ul className="text-muted">
               {
                    this.state.todo.map((value, key)=>{
                        if(value.checked)
                        {
                                return(
                                <li key={key}>
                                    {value.title}
                                    <input type="checkbox" checked={value.checked} onChange={this.changeChecked.bind(this, key)}></input>
                                    <button onClick={this.deleteSth.bind(this, key)}>删除</button>
                                </li>
                            )
                        }
                    })
                }
            </ul>
        </div>
    )
}
}


export default Todolist;
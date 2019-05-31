import React from 'react'
import Input from './Input'
class Form extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            comments: '',
            food_name: [],
            title: '',
            sick: false,
            sick_type: '',
            user_id: 1
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        // this.cleanArray = this.cleanArray.bind(this)
    }

    handleChange (event) {
        this.setState({[event.target.id] : event.target.value})
      }

      handleSubmit (event){
          
          event.preventDefault()
          

            // let foodArr = this.state.food_name.split(' ').join(',')
            
            // console.log(foodArr)
            
    
        


        this.props.handleSubmit(
          event,
          {
              
              comments: this.state.comments,
              food_name: this.state.food_name,
              title: this.state.title,
              sick: this.state.sick,
              sick_type: this.state.sick_type,
              user_id: this.state.user_id,
            //   PROBABLY WILL MAKE USER ID COME DOWN FROM APP
              
          }
        )
        this.setState({
          comments:'',
          food_name:'',
          title:'',
          sick: 0,
          sick_type: false,
          
        })
      //   if(this.props.notice) {
      //     this.props.toggleForm()
      //   }
        // this.props.toggleForm()
        }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <Input
                    handleChange={this.handleChange}
                    name={'title'}
                    placeholder={'title'}
                    type={'text'}
                    value={this.state.title}
                    id={'title'}
                />  
                <Input
                    handleChange={this.handleChange}
                    name={'comments'}
                    placeholder={'comments'}
                    type={'textarea'}
                    value={this.state.comments}
                    id={'comments'}
                />  
                <Input
                    handleChange={this.handleChange}
                    name={'sick'}
                    placeholder={'sick'}
                    type={'text'}
                    value={this.state.sick}
                    id={'sick'}
                />  
                <Input
                    handleChange={this.handleChange}
                    name={'sick_type'}
                    placeholder={'sick_type'}
                    type={'text'}
                    value={this.state.sick_type}
                    id={'sick_type'}
                />  
                 <Input
                    handleChange={this.handleChange}
                    name={'food_name'}
                    placeholder={'food_name'}
                    type={'text'}
                    value={this.state.food_name}
                    id={'food_name'}
                /> 

            <input type='submit' value={this.props.notice ? "update this meal" : "Add a Meal"}/>
        </form>
        )
    }
}
export default Form
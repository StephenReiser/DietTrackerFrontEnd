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
        // this.handleChange = this.handleChange.bind(this)
        // this.cleanArray = this.cleanArray.bind(this)
    }

    

      handleSubmit (event){
          
          event.preventDefault()
          

            // let foodArr = this.state.food_name.split(' ').join(',')
            
            // console.log(foodArr)
            
    
        


        this.props.handleSubmit(
          event,
          {
              
              comments: this.props.comments,
              food_name: this.props.food_name,
              title: this.props.title,
              sick: this.props.sick,
              sick_type: this.props.sick_type,
              user_id: this.props.user_id,
            //   PROBABLY WILL MAKE USER ID COME DOWN FROM APP
              
          }
        )
        // this.setState({
        //   comments:'',
        //   food_name:'',
        //   title:'',
        //   sick: 0,
        //   sick_type: false,
        // //   probably shoudl move this to the handleAdd form??
        // })
      //   if(this.props.notice) {
      //     this.props.toggleForm()
      //   }
        // this.props.toggleForm()
        }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <Input
                    handleChange={this.props.handleChange}
                    name={'title'}
                    placeholder={'title'}
                    type={'text'}
                    value={this.props.title}
                    id={'title'}
                />  
                <Input
                    handleChange={this.props.handleChange}
                    name={'comments'}
                    placeholder={'comments'}
                    type={'textarea'}
                    value={this.props.comments}
                    id={'comments'}
                />  
                <Input
                    handleChange={this.props.handleChange}
                    name={'sick'}
                    placeholder={'sick'}
                    type={'text'}
                    value={this.props.sick}
                    id={'sick'}
                />  
                <Input
                    handleChange={this.props.handleChange}
                    name={'sick_type'}
                    placeholder={'sick_type'}
                    type={'text'}
                    value={this.props.sick_type}
                    id={'sick_type'}
                />  
                 <Input
                    handleChange={this.props.handleChange}
                    name={'food_name'}
                    placeholder={'food_name'}
                    type={'text'}
                    value={this.props.food_name}
                    id={'food_name'}
                /> 

            <input type='submit' value={this.props.notice ? "update this meal" : "Add a Meal"}/>
        </form>
        )
    }
}
export default Form
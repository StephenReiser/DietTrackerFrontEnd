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
            user_id: 1,
            mealId: 0
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleCheck = this.handleCheck.bind(this)
        // this.handleChange = this.handleChange.bind(this)
        // this.cleanArray = this.cleanArray.bind(this)
    }
    componentWillMount() {
        if(this.props.meal) {
          this.setState({
            title: this.props.meal.title || '',
            food_name: this.props.meal.food_name || '',
            sick: this.props.meal.sick || false,
            sick_type: this.props.meal.sick_type || '',
            comments: this.props.meal.comments || false,
            user_id: this.props.currentId,
           
            mealId: this.props.meal.id || '',
           
          })
        }
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
              user_id: this.props.user_id,
              mealId: this.state.mealId
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
        if(this.props.editAvailable) {
          this.props.showEdit()
        }
        if (!this.props.editAvailable) {
          this.setState({
              comments:'',
              food_name:'',
              title:'',
              sick: false,
              sick_type: '',
          })
        }
        // this.props.toggleForm()
        }

        handleCheck () {
          // should be if checked = set state to true, else set state to false
          this.setState({
            sick: !this.state.sick
          })
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
                {/* <Input
                    handleChange={this.handleChange}
                    name={'sick'}
                    placeholder={'sick'}
                    type={'text'}
                    value={this.state.sick}
                    id={'sick'}
                />   */}
                

                {/* this below beasically is forcing user to use toggle sick button on edit but there is a check box on add new */}
                  {this.props.editAvailable ? null : <label>
                    <input type="checkbox" id = 'sick' onChange={this.handleCheck}/>
                    <span>Did this Make you sick?</span>
                  </label>}

                 {/* <label>
                    <input type="checkbox" id = 'sick' onChange={this.handleCheck}/>
                    <span>Did this Make you sick?</span>
                </label> */}
               
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

            <input type='submit' value={this.props.editAvailable ? "update this meal" : "Add a Meal"}/>
        </form>
        )
    }
}
export default Form
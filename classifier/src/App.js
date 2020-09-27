import React,{Component} from 'react'; 
import NavBar from "./components/NavBar";
import DisplayImage from "./components/DisplayImage";
import Result from "./components/Result";
const axios = require("axios");

class App extends Component { 
    constructor(props){
      super(props);
      this.state={
        imageUrl:"",
        file: null,
        name :""
      }
      this.onFormSubmit = this.onFormSubmit.bind(this);
      this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
      this.setState({name:""});
      this.setState({file:e.target.files[0]});
      this.preview(e);
    }

    preview = (e) => {

        const file    = this.refs.uploadImg.files[0]
        const reader  = new FileReader();
    
        reader.onloadend = () => {
            this.setState({
                imageUrl: reader.result
            })
        }
        if (file) {
            reader.readAsDataURL(file);
            this.setState({
                imageUrl :reader.result
            })
        } 
        else {
            this.setState({
                imageUrl: ""
            })
        }
    }

    onFormSubmit(e){
      this.setState({name:"Processing....."});
      e.preventDefault();
      const formData = new FormData();
      formData.append('myImage',this.state.file);
      const config = {
          headers: {
              'content-type': 'multipart/form-data'
          }
      };
      axios.post("http://localhost:8080/upload",formData,config)
          .then((response) => {
            console.log(response);
              var recieved_name=response.data.toString();
              console.log(recieved_name);
              this.setState({name:recieved_name});
          }).catch((error) => {
      });
    }


    render() { 
      var display_image="";
      if(this.state.imageUrl!=="")
        display_image=<DisplayImage path={this.state.imageUrl}/>;

      var display_result="";
      if(this.state.name!=="")
        display_result=<Result name={this.state.name}/>

      return ( 
        <div>
          <NavBar/>

          <div className="upload">
            <form onSubmit={this.onFormSubmit}>      
              <input
                ref="uploadImg"
                type="file"
                name="selectedFile"
                accept="image/*"
                onChange= {this.onChange}
                id="browse_button"
                >
                  </input>
                <input type="submit" name="myImage" id="classify_button" value="Classify"></input>
            </form>
          </div>

          {display_image}
          {display_result}
        </div>    
      )
    } 
  } 
  
export default App; 


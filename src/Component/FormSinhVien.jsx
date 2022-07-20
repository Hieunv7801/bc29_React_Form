import React, { Component,createRef } from 'react'
import { connect } from 'react-redux'
import {addUserAction, updateUserAction} from '../Store/actions/user'
const DEFAULT_VALUES = {
    id: '',
    maSV: '',
    fullname: '',
    email: '',
    phoneNumber: '',
}
 class FormSinhVien extends Component {

    state = {
        values: DEFAULT_VALUES,
        errors: {
            id: '',
            maSV: '',
            fullname: '',
            email: '',
            phoneNumber: '',
        }
    }
    formRef = createRef();

     //* biến props thành state
     static getDerivedStateFromProps(nextProps, currentState) {
        if (nextProps.selectedUser && currentState.values.id !== nextProps.selectedUser.id) {
            currentState.values = nextProps.selectedUser;
        }
        return currentState;
    }

    handleSubmit = (event) => {
    event.preventDefault();

    if(!event.target.checkValidity()){
        return ;
    }

    if(this.props.selectedUser){
        this.props.dispatch(updateUserAction(this.state.values))
    }else{
        this.props.dispatch(addUserAction(this.state.values));
    }
    this.setState({
        values: DEFAULT_VALUES,
    }, () => {
        this.forceUpdate();
    })
  }
  handleBlur = (event) => {
    const {name, title, minLength, maxLength, 
        validity: {valueMissing, patternMismatch, tooLong, tooShort}} = event.target;

        let mess = '';

        if(patternMismatch){
            mess = `${title} is invalid partten.`
        }
        if(tooShort || tooLong){
            mess = `${title} from ${minLength} - ${maxLength} charactors`
        }
        if(valueMissing){
            mess = `${title} is required`
        }
        this.setState({
            errors: {
                ...this.state.errors,
                [name] : mess
            }
        })
  }
  handleChange = (event) => {
    const { name, value } = event.target;
        this.setState({
            values: {
                //* giữ lại giá trị cũ thông qua spread operator
                ...this.state.values,
                [name]: value,
            }
        });
  }
  render() {
    const {maSV, fullname, phoneNumber, email} = this.state.values || {};
    return (
      <div className='container'>
        <div className="card">
                    <div className="card-header bg-dark text-white"><h3>Thông tin sinh viên</h3></div>
                    <div className="card-body">
                        <form ref={this.formRef} noValidate onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div class="form-group col-6">
                                    <span>Mã SV</span>
                                    <input 
                                    required
                                    value={maSV}
                                    title='Ma SV'
                                    onChange={this.handleChange}
                                    onBlur={this.handleBlur}
                                    className='form-control' name='maSV'/>
                                    {this.state.errors.maSV &&
                                        <span className='text-danger'>
                                            {this.state.errors.maSV}
                                        </span>}
                                </div>
                                <div class="form-group col-6">
                                    <span>Họ và tên</span>
                                    <input 
                                    value={fullname}
                                    required
                                    title='Full name'
                                    minLength={4}
                                    maxLength={13}
                                    onChange={this.handleChange}
                                    onBlur={this.handleBlur}
                                    className='form-control' name='fullname'/>
                                    {this.state.errors.fullname &&
                                        <span className='text-danger'>
                                            {this.state.errors.fullname}
                                        </span>}
                                </div>
                                <div class="form-group col-6">
                                    <span>Email</span>
                                    <input 
                                    required
                                    value={email}
                                    title='Email'
                                    onChange={this.handleChange}
                                    onBlur={this.handleBlur}
                                    pattern='[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.]{1}[a-zA-Z]{2,}$'
                                    className='form-control' name='email'/>
                                    {this.state.errors.email &&
                                        <span className='text-danger'>
                                            {this.state.errors.email}
                                        </span>}
                                </div>
                                <div class="form-group col-6">
                                    <span>Số điện thoại</span>
                                    <input 
                                    value={phoneNumber}
                                    required
                                    title='Phone Number'
                                    onChange={this.handleChange}
                                    onBlur={this.handleBlur}
                                    className='form-control' name='phoneNumber'/>
                                    {this.state.errors.phoneNumber &&
                                        <span className='text-danger'>
                                            {this.state.errors.phoneNumber}
                                        </span>}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 text-left">                      
                                   <button disabled={!this.formRef.current?.checkValidity()} className='btn btn-success' type='submit' >Thêm sinh viên</button>  
                                </div>
                            </div>
                        </form>
                        
                    </div>
                </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
    return{
        ...state.userReducer
    }
}
export default connect(mapStateToProps)(FormSinhVien);
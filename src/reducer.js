const initialState = {
    isLoggedIn: false,
    landlord: {},
    issues:{},
    tenants:{},
    todos:{},
    properties:{}

}


const reducer = (state = initialState, action) =>{

  if(action.type ===  "SET_LOGIN_STATES"){
    return{
      ...state,
      isLoggedIn: true,
      landlord: action.payload.data.landlord,
      issues: action.payload.data.issues,
      tenants: action.payload.data.tenants,
      todos: action.payload.data.todos,
      properties: action.payload.data.properties

    }
  }
  if(action.type === "SET_LOG_OUT"){
    return{
      ...state,
      isLoggedIn: false,
      landlord: {},
      issues: {},
      tenants: {},
      todos:{},
      properties:{}
    }
  }
  if (action.type === "ADD_PROPERTY"){
    return{
      ...state,
      properties: [...state.properties, action.payload.property]
    }
  }
  if(action.type === "DELETE_PROPERTY"){
    return{
      ...state,
      properties: state.properties.filter(p => p.id !== action.payload.property.id)
    }
  }
  return state
}

export default reducer
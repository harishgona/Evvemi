exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: [  
   'app/templates/users/spec.js'   
    
   
   //Specs
   , 'app/templates/courses/spec.js' 
   , 'app/templates/students/spec.js' 

  ]
}


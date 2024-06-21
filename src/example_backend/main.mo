import Array "mo:base/Array";

actor {
 
  stable var departments : [Department] = [];
 


  public type Department = {
    DeptId : Text;
    departmentName : Text;
  };

  
  public query func getDepartments() : async [Department] {
    return departments;
  };
 
  

  public func addDepartment(DeptId : Text, departmentName : Text) : async () {
    let newDepartment : [Department] = [{ DeptId; departmentName}];
    departments := Array.append(departments, newDepartment);
  };

 

 
};
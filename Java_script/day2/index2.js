let attempt=0;
let open=false;
let pass ="Hariom";
let password=prompt("enter password");
attempt++;
if(password===pass) open=true;
while(password!==pass){
    if(attempt===3){
        console.error("Account Locked");
        break;
    }
    password=prompt("Enter password");
    if(password===pass) open=true;
    attempt++;
}
if(open=== true)console.log("Account openend");
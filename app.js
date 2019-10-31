class EmailListClass {
  constructor () {
    this.emails = JSON.parse(localStorage.getItem('EMAILS'));
    console.log(this.emails);
    if(!this.emails) {
      this.emails = [
        {email: 'quickfox@brown.com', isDisabled: false},
        {email: 'stall@bar.com', isDisabled: false},
      ]
    }

    this.loadEmails();
  }

  toggleStatus(index) {
    this.emails[index].isDisabled = !this.emails[index].isDisabled;
    this.loadEmails();
  }

  addEmailClick() {
    let target = document.getElementById('email');
    let exists = document.getElementById('exists');
    let temparr = this.emails.map((item)=>item.email);
    if (temparr.indexOf(target.value) > -1)
      {exists.classList.remove('hidden')}
     else
     {exists.classList.add('hidden');
      this.addEmail(target.value);
      target.value = "";}
  }

  deleteEmail(event,emailIndex) {
    event.preventDefault();
    this.emails.splice(emailIndex,1);
    let remove = localStorage.removeItem('EMAILS');
    console.log(remove);
    this.loadEmails();
  }

  validateEmail(e) {
    let event = window.event || e;
    let emailString = event.target.value;
    const regex = /^[^@]+?@[^@]+\.[a-zA-Z]+$/;
    (regex.test(emailString)) ?
    this.addSucess():
    this.addError()
  }

  addSucess() {
    let target = document.getElementById('email');
    target.classList.remove("error");
    target.classList.add("success");
  }

  addError() {
    let target = document.getElementById('email');
    target.classList.remove("success");
    target.classList.add("error");
  }

  addEmail(email) {
      let newEmail = {
        email,
        isDisabled : false,
      };

      if(email === '') {
        this.addError();
      }
      else {
        this.addSucess();
        this.emails.push(newEmail);
        this.loadEmails();
      }
  }

  generateEmailHtml(email,index) {
    console.log(email);
    return `<li class="email-wrapper ${email.isDisabled ? 'disabled' : ''}"">
      <div><input id="toggleStatus" type="checkbox" onchange="emailLists.toggleStatus(${index})" class="" ${email.isDisabled ? 'checked' : ''}/></div>
      <div class="email-text">${email.email}</div>
      <div class="email-delete"><a class="" href="" onClick="emailLists.deleteEmail(event, ${index})">Remove</a></div>
    </li>`;
  }

  loadEmails() {
    localStorage.setItem('EMAILS', JSON.stringify(this.emails));
    let emailHtml = this.emails.reduce((html, email, index) => html += this.generateEmailHtml(email,index), '');
    document.getElementById('emailList').innerHTML = emailHtml;
  }
}

  let emailLists;

  window.addEventListener('load', ()=>{
    emailLists = new EmailListClass();
  });

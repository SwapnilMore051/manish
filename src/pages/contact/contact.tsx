import "./contact.scss";

const Contact = () => {
  const contactOptions = [
    {
      icon: "/assets/icons/phone2.svg",
      text: "+91 7517771047",
      onClick: () => window.open("tel:+917517771047"),
    },
    {
      icon: "/assets/icons/mail.svg",
      text: "manish17more@gmail.com",
      onClick: () =>
        window.open(
          "https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=CllgCJqVNNZQjhFDdxzhKHSGlSJTZHcPGDnJXmplGlMRBkWSDbGhQPhNGCcWtgHKWzRtcXlQdQB"
        ),
    },
    {
      icon: "/assets/icons/linkedin2.svg",
      text: "manish-more",
      onClick: () =>
        window.open("https://www.linkedin.com/in/manish-more-b2a836298/"),
    },
    {
      icon: "/assets/icons/behance.svg",
      text: "manishmore11",
      onClick: () => window.open("https://www.behance.net/manishmore11"),
    },
  ];

  return (
    <div className="contact-layout">
      <div className="title contact-title">Contact</div>
      <div className="contact-wrapper">
        {contactOptions.map((option, index) => (
          <div className="contact-option" onClick={option.onClick} key={index}>
            <img className="contact-icon" src={option.icon} alt="" />
            <div className="contact-text">{option.text}</div>
          </div>
        ))}
      </div>
      <div className="copyright">© 2025 Manish More | Built by 
        <a className="author-link" href="https://www.linkedin.com/in/swapnil-more-966509227" target="_blank" rel="noopener noreferrer">
          {""} Swapnil More
        </a>
        .</div>

    </div>
  );
};

export default Contact;

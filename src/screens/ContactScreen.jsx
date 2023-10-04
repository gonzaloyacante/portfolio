export const ContactScreen = () => {
  return (
    <section className="my-5" id="Skills">
      <h2>Contáctame</h2>
      <form name="contact" method="POST" data-netlify="true" onSubmit="submit">
        <input type="hidden" name="form-name" value="contact" />
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
            <input
              name="email"
              type="email"
              className="form-control"
              id="email"
            />
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
            <input
              name="password"
              type="password"
              className="form-control"
              id="password"
            />
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </section>
  );
};

function HomePage() {
  return (
    <div className="font-sans max-w-screen-sm mx-auto">
      <header>
        <span className="text-4xl">👨‍💻</span>
        <h1 className="text-2xl font-medium">Daniel O’Connor</h1>
        <p>
          Hello! I’m a design systems and front-end infrastructure engineer in
          San Francisco. I use code and communication to improve product quality
          and developer productivity.
        </p>
        <p>
          Right now I build <a href="https://thumbprint.design/">Thumbprint</a>,
          the design system at{" "}
          <a href="https://www.thumbtack.com/">Thumbtack</a>. I previously
          worked at <a href="https://www.optimizely.com/">Optimizely</a> where I
          helped build and maintain{" "}
          <a href="https://github.com/optimizely/oui">OUI</a>, a React component
          library.
        </p>
      </header>
    </div>
  );
}

export default HomePage;

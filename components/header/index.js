export default function Header() {
  return (
    <header>
      <div className="header flex flex-col pt-4">
        <img className="p-2" src="/assets/images/bg_logo.svg" />
        <div className="p-2 text-sm text-center">
          Dek Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem
          ipsum Lorem ipsum Lorem ipsum
        </div>
        <a
          className="submit-camp button red"
          href="https://docs.google.com/forms/d/e/1FAIpQLSe3e0RWm6MbVSHJYX4wWImjYctmV2BjzH7HMxXP5FvQjEFPQw/viewform"
          rel="noreferrer"
          target="_blank"
        >
          Submit your camp
        </a>
      </div>
    </header>
  )
}

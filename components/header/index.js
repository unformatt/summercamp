export default function Header() {
  return (
    <header>
      <div className="header flex flex-col pt-4">
        <img className="p-2" src="/assets/images/bg_logo.svg" />
        <div className="p-2 text-sm text-center">
          For this feature, The Boston Globe reached out to camps across New England.
          Here are the camps that still had availability as of early August. Please
          contact the camps directly for further details.
        </div>
        <a
          className="submit-camp button red"
          href="https://docs.google.com/forms/d/e/1FAIpQLSe3e0RWm6MbVSHJYX4wWImjYctmV2BjzH7HMxXP5FvQjEFPQw/viewform"
          rel="noreferrer"
          target="_blank"
        >
          Add a camp
        </a>
      </div>
    </header>
  )
}

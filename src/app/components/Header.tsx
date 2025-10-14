export function Header() {
  return (
    <div className="space-y-2 h-max">
      <h1 className="text-4xl font-bold tracking-wider">
        Hi, I&apos;m Wilbert Bernardi
      </h1>
      <div className="flex gap-x-4">
        <span className="text-lg text-muted-foreground">
          &bull; Lives in Medan, Indonesia (ID)
        </span>
        <span className="text-lg text-muted-foreground">&bull; Remote</span>
      </div>
      <p className="font-extralight leading-loose">
        A web developer who creates websites using the latest technology.
      </p>
    </div>
  );
}

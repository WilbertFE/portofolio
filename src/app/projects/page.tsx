"use client";

import { Header, MainProjects } from "./components";

export default function page() {
  return (
    <div className="flex flex-wrap gap-y-16 px-8 pb-32 container mx-auto">
      <Header />
      <MainProjects />
      {/* <div className="w-full space-y-8">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold tracking-wider">
            Learning Projects
          </h1>
          <p className="text-lg tracking-wide">
            Proyek yang saya buat untuk belajar.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8">
          {[...learningProjects]
            .sort((a: Projects, b: Projects) => b.year - a.year)
            .map((project, i) => (
              <div key={i} className="border bg-transparent p-1 rounded-xl">
                <Card className="px-4 py-6 h-full">
                 
                  <Skeleton className="max-w-full h-64" />

                  <CardHeader className="space-x-4">
                    <CardTitle className="text-lg tracking-wider">
                      {project.title}{" "}
                      <span className="text-muted-foreground text-base">
                        {"["}
                        {project.year}
                        {"]"}
                      </span>
                    </CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                    <CardAction className="self-center">
                      <Button
                        asChild
                        variant="link"
                        className="tracking-wider font-bold text-my-primary"
                      >
                        <Link className="relative" href={project.href}>
                          Visit{" "}
                          <TiLocationArrow className="absolute top-0 -right-1" />
                        </Link>
                      </Button>
                    </CardAction>
                  </CardHeader>
                  <CardFooter className="space-x-4">
                    {project.icons.map((icon, i) => (
                      <icon.icon key={i} size={32} color={icon.color} />
                    ))}
                  </CardFooter>
                </Card>
              </div>
            ))}
        </div>
      </div> */}
    </div>
  );
}

// const learningProjects: Projects[] = [
//   {
//     title: "Calculator",
//     description:
//       "Dapat menyelesaikan operasi aritmatik sederhana seperti tambah, kurang, bagi, kali.",
//     image: "/img/projects/learning/calculator.png",
//     href: "https://wilbertfe.github.io/Calculator/",
//     year: 2023,
//     icons: [
//       {
//         icon: DiHtml5,
//         color: "red",
//       },
//       {
//         icon: DiCss3,
//         color: "lightblue",
//       },
//       { icon: RiJavascriptFill, color: "yellow" },
//     ],
//   },

//   {
//     title: "Portofolio V1",
//     description: "Website portofolio pertama saya.",
//     image: "/img/projects/learning/portofolio1.png",
//     href: "https://wilbertfe.github.io/PortofolioV1/",
//     year: 2023,
//     icons: [
//       {
//         icon: DiHtml5,
//         color: "red",
//       },
//       {
//         icon: DiCss3,
//         color: "lightblue",
//       },
//       { icon: RiJavascriptFill, color: "yellow" },
//     ],
//   },
//   {
//     title: "wBurger",
//     description: "Website yang saya buat untuk belajar layouting.",
//     image: "/img/projects/learning/burger-web.png",
//     href: "https://wilbertfe.github.io/burgerWeb/",
//     year: 2023,
//     icons: [
//       {
//         icon: DiHtml5,
//         color: "red",
//       },
//       {
//         icon: DiCss3,
//         color: "lightblue",
//       },
//       { icon: RiJavascriptFill, color: "yellow" },
//     ],
//   },
//   {
//     title: "Jaaz",
//     description:
//       "Website yang saya buat untuk belajar layouting dan responsive design.",
//     image: "/img/projects/learning/Jaaz.png",
//     href: "https://wilbertfe.github.io/Jaaz/",
//     year: 2023,
//     icons: [
//       {
//         icon: DiHtml5,
//         color: "red",
//       },
//       {
//         icon: RiTailwindCssFill,
//         color: "cyan",
//       },
//       { icon: RiJavascriptFill, color: "yellow" },
//     ],
//   },
//   {
//     title: "To-do-list",
//     description:
//       "Project to-do-list sederhana. Bisa menambahkan tugas, menghapus, mengedit, dan mengingat tugas yang telah ditambahkan.",
//     image: "/img/projects/learning/to-do-list.png",
//     href: "https://wilbertfe.github.io/To-Do-List/",
//     year: 2023,
//     icons: [
//       {
//         icon: DiHtml5,
//         color: "red",
//       },
//       {
//         icon: DiCss3,
//         color: "lightblue",
//       },
//       { icon: RiJavascriptFill, color: "yellow" },
//     ],
//   },
// ];

"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { Users, Menu } from "lucide-react"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  // Better scroll event handling with cleanup
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    {
      name: "HR Management",
      href: "#",
      hasDropdown: true,
      dropdownItems: [
        {
          name: "Core HR",
          href: "#",
          description: "Empowering organizations with seamless management of their human capital.",
        },
        {
          name: "Performance",
          href: "#",
          description: "Unleashing the full potential of speed and efficiency.",
        },
        {
          name: "Payroll Management",
          href: "#",
          description: "Efficiently streamline and automate your payroll processes with precision.",
        },
      ],
    },
    {
      name: "Recruitment & Onboarding",
      href: "#",
      hasDropdown: true,
      dropdownItems: [
        {
          name: "Recruitment",
          href: "#",
          description: "Unlocking potential by connecting talent with opportunity.",
        },
        {
          name: "Onboarding",
          href: "#",
          description: "Navigating the path to seamless integration and success.",
        },
      ],
    },
    {
      name: "Resources",
      href: "#",
      hasDropdown: true,
      dropdownItems: [
        {
          name: "Help & Support",
          href: "#",
          description: "Guiding you towards solutions with expertise and empathy.",
        },
        {
          name: "Documentation",
          href: "#",
          description: "Comprehensive guides and resources for your HR needs.",
        },
      ],
    },
    {
      name: "Pricing",
      href: "#pricing",
      hasDropdown: false,
    },
    {
      name: "About",
      href: "#about",
      hasDropdown: true,
      dropdownItems: [
        {
          name: "Our Story",
          href: "#",
          description: "Learn about our mission and vision for the future of HR.",
        },
        {
          name: "Team",
          href: "#",
          description: "Meet the people behind HRFlow's innovation and success.",
        },
      ],
    },
  ]

  return (
      <header
          className={`sticky top-0 z-40 w-full transition-all duration-300 ${
              isScrolled
                  ? "bg-white/80 backdrop-blur-md border-b shadow-sm dark:bg-gray-900/80 dark:border-gray-800"
                  : "bg-white dark:bg-gray-900"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="size-9 rounded-md bg-blue-600 flex items-center justify-center transition-all duration-300 group-hover:bg-blue-700">
              <Users className="size-5 text-white" />
            </div>
            <span className="text-blue-600 font-bold">
            HR<span className="text-red-500">Flow</span>
          </span>
          </Link>

          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="gap-1">
              {navItems.map((item) =>
                  item.hasDropdown ? (
                      <NavigationMenuItem key={item.name}>
                        <NavigationMenuTrigger className="text-sm font-medium text-gray-700 dark:text-gray-200 h-10 bg-transparent">
                          {item.name}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            {item.dropdownItems?.map((dropdownItem) => (
                                <li key={dropdownItem.name}>
                                  <NavigationMenuLink asChild>
                                    <Link
                                        href={dropdownItem.href}
                                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                                    >
                                      <div className="text-sm font-medium leading-none">{dropdownItem.name}</div>
                                      <p className="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">
                                        {dropdownItem.description}
                                      </p>
                                    </Link>
                                  </NavigationMenuLink>
                                </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                  ) : (
                      <NavigationMenuItem key={item.name}>
                        <Link
                            href={item.href}
                            className={cn(
                                "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors",
                                "text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400",
                            )}
                        >
                          {item.name}
                        </Link>
                      </NavigationMenuItem>
                  ),
              )}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="hidden lg:flex items-center gap-2">
            <Link
                href="/login"
                className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 px-4 py-2"
            >
              Login
            </Link>
            <Button>Start Free Trial</Button>
          </div>

          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="size-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
                side="right"
                className="w-[300px] sm:w-[400px] backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 border-l"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-8">
                  <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                    <div className="size-8 rounded-md bg-blue-600 flex items-center justify-center">
                      <Users className="size-4 text-white" />
                    </div>
                    <span className="text-blue-600 font-bold">
                    HR<span className="text-red-500">Flow</span>
                  </span>
                  </Link>
                </div>
                <nav className="flex flex-col gap-6 mb-8">
                  {navItems.map((item) => (
                      <div key={item.name} className="flex flex-col gap-2">
                        <Link
                            href={item.href}
                            className="text-lg font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          {item.name}
                        </Link>
                        {item.hasDropdown && (
                            <div className="pl-4 flex flex-col gap-3 mt-1 border-l border-gray-200 dark:border-gray-700">
                              {item.dropdownItems?.map((dropdownItem) => (
                                  <Link
                                      key={dropdownItem.name}
                                      href={dropdownItem.href}
                                      className="flex flex-col gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                                  >
                                    <span className="font-medium">{dropdownItem.name}</span>
                                    <span className="text-xs">{dropdownItem.description}</span>
                                  </Link>
                              ))}
                            </div>
                        )}
                      </div>
                  ))}
                </nav>
                <div className="mt-auto flex flex-col gap-3">
                  <Link
                      href="/login"
                      className="w-full text-center py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Login
                  </Link>
                  <Button>Start Free Trial</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
  )
}


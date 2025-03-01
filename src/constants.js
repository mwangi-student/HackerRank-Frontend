export const LANGUAGE_VERSIONS = {
  javascript: "18.15.0",
  typescript: "5.0.3",
  python: "3.10.0",
  java: "15.0.2",
  csharp: "6.12.0",
  php: "8.2.3",
  c: "10.2.0",
  ruby: "3.0.1",
};

export const CODE_SNIPPETS = {
  javascript: `\nfunction greet(name) {\n\t// code here\n}\n\n// don't remove this function call!\nconsole.log(greet("Antony"))\n`,
  typescript: `\nfunction greet(name: string): void {\n\t// code here\n}\n\n// don't remove this function call!\nconsole.log(greet("Antony"))\n`,
  python: `\ndef greet(name):\n\t# code here\n\n# don't remove this function call!\nprint(greet("Antony"))\n`,
  java: `\npublic class Main {\n\tstatic void greet(String name) {\n\t\t// code here\n\t}\n\n\t// don't remove this function call!\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println(greet("Antony"));\n\t}\n}\n`,
  csharp: `\nusing System;\n\nclass Program {\n\tstatic void Greet(string name) {\n\t\t// code here\n\t}\n\n\t// don't remove this function call!\n\tstatic void Main() {\n\t\tConsole.WriteLine(Greet("Antony"));\n\t}\n}\n`,
  php: `\nfunction greet($name) {\n\t// code here\n}\n\n// don't remove this function call!\necho greet("Antony");\n`,
  ruby: `\ndef greet(name)\n\t# code here\nend\n\n# don't remove this function call!\nputs greet("Antony")\n`,
  c: `\n#include <stdio.h>\n\nvoid greet(char *name) {\n\t// code here\n}\n\n// don't remove this function call!\nint main() {\n\tprintf("%s", greet("Antony"));\n\treturn 0;\n}\n`,
};

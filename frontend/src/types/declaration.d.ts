// declaration.d.ts
declare module '*.css' {
    const content: Record<string, string>;
    export default content;
}

declare module '*.scss' {
    const content: Record<string, string>;
    export default content;
}

declare module "*.module.png";
declare module "*.module.jpg";
declare module "*.module.svg";
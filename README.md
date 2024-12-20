
[X] - User CRUD
[X] - Task CRUD
[X] - Authentication
[X] - Guards
[X] - Data Validation
[X] - User Entity
[X] - Task Entity
[X] - Database Configuration
[X] - Migrations
[X] - Connecting to the Database
[X] - Refactoring
[X] - Guard TaskOwner
[] - Implementing Unit Tests











The Nest (NestJS) is a Node.js backend framework that combines elements of object-oriented programming, functional programming, and reactive programming. Under the hood, it uses Express by default, offering a variety of features and tools to facilitate the development of robust, loosely coupled, and maintainable APIs.

Among the main advantages of using Nest, we can highlight:

    Modularity: Nest allows developers to create scalable and modular APIs, making the code easier to manage and evolve.

    Consistent architecture: The framework adopts a consistent architecture that helps maintain code organization, facilitates component reuse, and promotes good development practices.

    TypeScript compatibility: Nest is built on TypeScript, which means developers can leverage the features and tools of the language to create safer and more scalable APIs.

    Abstraction of common tasks: Nest provides features that abstract common tasks, such as error handling, data validation, and authentication, allowing developers to focus on implementing API logic.

    Active community: Nest has an active and growing community, meaning developers can rely on support and additional resources to help them in API development.

Controllers

A controller is an essential part of a software architecture pattern called Model-View-Controller (MVC). It is responsible for receiving incoming requests (HTTP requests) and processing them before forwarding them to the model or service layer to perform the necessary operations. The controller then sends the response back to the client as an HTTP response.

Controllers handle client request inputs, such as GET, POST, PATCH, and DELETE. They contain methods corresponding to actions that users can perform. These methods are usually referred to as "endpoints" and are mapped to the API routes defined for each received request. Each endpoint is responsible for processing a specific request and producing a corresponding response.

The controller may also check if the request parameters are correct and ensure that user authentication and authorization have been properly handled. This helps guarantee that only authorized users can access protected API resources.
Decorators

Decorators are a key feature in NestJS, used to provide metadata and simplify the configuration of classes and methods. They are applied using the @ symbol and can be used to define things like routes, middleware, and validation logic in a declarative way.
Dependency Injection

Dependency Injection (DI) is a software design pattern that allows an object's dependencies to be provided externally rather than created internally. DI is a technique that helps developers reduce coupling between software components, making systems more flexible, scalable, and easier to maintain.
Providers

A provider is a class that can be injected into other classes using the Dependency Injection mechanism.

The primary purpose of a provider is to supply an instance of a specific class or object to other parts of the system. This can include, for example, database access, consuming an external API, or performing some other specific task. Providers are used to create and manage these instances and make them easily accessible to other parts of the system.
Modules

A module is a container for a set of related components, such as controllers, service providers, and other modules. Each module is defined in a separate file and can be imported into other modules. This helps organize code into distinct and independent parts.

Guards

Guards in NestJS are responsible for determining whether a request can be processed by a route handler. They are executed before the route's middleware or pipe and are designed to implement access control logic or any preliminary checks.



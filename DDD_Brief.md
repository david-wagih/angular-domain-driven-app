Briefing Document: Domain-Driven Design - Tackling Complexity in the Heart of Software
Source: Excerpts from "Domain-Driven Design: Tackling Complexity in the Heart of Software" by Eric Evans

Date: October 26, 2023

Overview: This document summarizes the main themes and important ideas presented in the provided excerpts from Eric Evans' "Domain-Driven Design." The central argument of these excerpts is that software design should be deeply rooted in an understanding of the business domain it serves. By focusing on creating a rich and expressive domain model, development teams can better manage complexity, improve communication between technical and business stakeholders, and ultimately build more valuable and maintainable software.

Main Themes and Important Ideas:
1. The Importance of a Domain Model:

A domain model is a selectively simplified and consciously structured form of knowledge about the user's activity or interest that the software addresses.
"A model is a simplification. It is an interpretation of reality that abstracts the aspects relevant to solving the problem at hand and ignores extraneous detail."
Models are crucial tools for grappling with the volume and complexity of information inherent in software domains.
"To create software that is valuably involved in users' activities, a development team must bring to bear a body of knowledge related to those activities. The breadth of knowledge required can be daunting. The volume and complexity of information can be overwhelming. Models are tools for grappling with this overload."
Domain-driven design emphasizes a model that is not just for early analysis but serves as the very foundation of the design.
"Domain-driven design calls for a model that doesn't just aid early analysis but is the very foundation of the design."
2. Ubiquitous Language:

A domain model should be the core of a common language for a software project, understood and used by both technical and business experts.
"A domain model can be the core of a common language for a software project. The model is a set of concepts built up in the heads of people on the project, with terms and relationships that reflect domain insight. These terms and interrelationships provide the semantics of a language that is tailored to the domain while being precise enough for technical development."
Actively engaging with language, playing with words and phrases, is vital to the modeling effort.
"It is vital that we play around with words and phrases, harnessing our linguistic abilities to the modeling effort, just as it is vital to engage our visual/spatial reasoning by sketching diagrams."
3. Model-Driven Design:

Tightly relating the code to an underlying domain model gives the code meaning and makes the model relevant.
"Tightly relating the code to an underlying model gives the code meaning and makes the model relevant."
The software's structure and behavior should directly reflect the concepts and relationships within the domain model.
4. Layered Architecture:

To manage complexity and isolate the domain logic, a layered architecture is recommended. The excerpt describes three key layers:
User Interface Layer (or Presentation Layer): Responsible for displaying information to the user and interpreting user input. Should be kept thin and not contain business rules.
Domain Layer (or Model Layer): The heart of the business software, responsible for representing concepts of the business, business rules, and the business situation.
Infrastructure Layer: Provides generic technical capabilities that support the higher layers (e.g., database access, messaging, UI widgets).
"This layer is kept thin. It does not contain business rules or knowledge, but only coordinates tasks and delegates work to collaborations of domain objects in the next layer down... Domain Layer (or Model Layer) Responsible for representing concepts of the business, information about the business situation, and business rules... Infrastructure Layer Provides generic technical capabilities that support the higher layers..."
5. Distinguishing Entities and Value Objects:

Entities (Reference Objects): Defined by their continuity of identity through a lifecycle, independent of their attributes. Identity must be unique within the system.
"Many objects are not fundamentally defined by their attributes, but rather by a thread of continuity and identity... An ENTITY is anything that has continuity through a life cycle and distinctions independent of attributes that are important to the application's user."
Value Objects: Defined by their attributes and have no conceptual identity. They are instantiated to represent descriptive aspects of the domain and should ideally be immutable.
"An object that represents a descriptive aspect of the domain with no conceptual identity is called a VALUE OBJECT. VALUE OBJECTS are instantiated to represent elements of the design that we care about only for what they are, not who or which they are."
"When you care only about the attributes of an element of the model, classify it as a VALUE OBJECT. Make it express the meaning of the attributes it conveys and give it related functionality. Treat the VALUE OBJECT as immutable. Don't give it any identity and avoid the design complexities necessary to maintain ENTITIES."
6. Services:

Services represent important domain operations that do not naturally belong to an Entity or Value Object and are stateless in the model.
"This pattern is focused on those SERVICES that have an important meaning in the domain in their own right, but of course SERVICES are not used only in the domain layer... Domain and application SERVICES collaborate with these infrastructure SERVICES."
Domain Services encapsulate business logic that involves multiple domain objects or processes.
7. Modules (Packages):

Modules are used to organize the domain model and reduce cognitive overload by providing two views: detail within a module and relationships between modules.
"MODULES give people two views of the model: They can look at detail within a MODULE without being overwhelmed by the whole, or they can look at relationships between MODULES in views that exclude interior detail."
Modules in the domain layer should emerge as a meaningful part of the model, reflecting the story of the domain on a larger scale.
"The MODULES in the domain layer should emerge as a meaningful part of the model, telling the story of the domain on a larger scale."
Module names should become part of the Ubiquitous Language.
"Give the MODULES names that become part of the UBIQUITOUS LANGUAGE."
8. Aggregates:

An Aggregate is a cluster of associated objects that are treated as a single unit for the purpose of data changes. An Aggregate has a root Entity, and external objects can only hold references to the root.
"Therefore, the car is the root ENTITY of the AGGREGATE whose boundary encloses the tires also."
Aggregates enforce consistency and integrity within their boundaries.
9. Repositories:

A Repository provides a way to access and manage all objects of a certain type (typically Aggregate roots). It acts like a collection with querying capabilities, abstracting away the underlying data storage mechanism.
"A REPOSITORY represents all objects of a certain type as a conceptual set (usually emulated). It acts like a collection, except with more elaborate querying capability."
"The REPOSITORY retrieves the requested object, encapsulating the machinery of database queries and metadata mapping."
10. Factories:

Factories encapsulate complex object creation logic, shielding clients from the details of instantiation.
"A mechanism for encapsulating complex creation logic and abstracting the type of a created object for the sake of a client."
11. Specifications:

A Specification defines a predicate that can be used to determine if an object satisfies certain criteria. They allow business rules to be expressed declaratively and can be combined using logical operators.
"With predicates, we could declare rules explicitly and use them with the Invoice."
"A Specification is a predicate that determines whether an object satisfies some criteria."
12. Intention-Revealing Interfaces:

Methods and classes should have names that clearly communicate their purpose and the underlying domain concepts.
"This logic is so simple that the rule is obvious. But you can easily imagine this constraint getting lost in a more complicated class. Let's factor it into a separate method, with a name that clearly and explicitly expresses the significance of the constraint."
13. Side-Effect-Free Functions:

Operations that compute and return a result without modifying the state of the system. Using such functions can improve predictability and testability.
"Operations can be broadly divided into two categories, commands and queries... For our purposes, let's narrow that meaning to any change in the state of the system that will affect future operations."
14. Assertions:

Statements that characterize the expected outcome or state change of methods that do have side effects.
15. Strategic Design - Managing Complexity at a Larger Scale:

Bounded Contexts: Explicitly defining the scope within which a particular domain model applies and is kept consistent.
Context Map: A diagram to visualize the different Bounded Contexts within a system and their relationships.
Anticorruption Layer: A layer to isolate a subsystem from dependencies on an external system's model or interface, translating between the two.
"Those are the basic elements I use to create an ANTICORRUPTION LAYER."
Published Language: Using a well-documented shared language (e.g., XML with schemas) to facilitate communication between different systems or bounded contexts.
"Use a well-documented shared language that can express the necessary domain information as a common medium of communication, translating as necessary into and out of that language."
Core Domain: Identifying and focusing effort on the most valuable and differentiating parts of the domain.
Generic Subdomains: Factoring out cohesive subdomains that are not the core focus and using generic models for them.
"Identify cohesive subdomains that are not the motivation for your project. Factor out generic models of these subdomains and place them in separate MODULES. Leave no trace of your specialties in them."
Domain Vision Statement: A clear and concise statement outlining the purpose and scope of the domain model.
"This is part of a DOMAIN VISION STATEMENT"
Responsibility Layers: Organizing a large system by grouping responsibilities into conceptual layers to enhance comprehensibility and manage dependencies.
"In a model with a natural stratification, conceptual layers can be defined around major responsibilities, uniting the two powerful principles of layering and responsibility-driven design."
16. Supple Design:

A design that is easy to understand, use, and modify due to a deep model, clear intent, limited dependencies, and minimal side effects.
"A supple design communicates its intent. The design makes it easy to anticipate the effect of running codeand therefore it easy to anticipate the consequences of changing it."
Conclusion:

These excerpts lay the groundwork for Domain-Driven Design as a powerful approach to tackling complexity in software development. By emphasizing a deep understanding of the domain, fostering a shared language, and structuring software based on a rich domain model using patterns like Entities, Value Objects, Services, Aggregates, and a layered architecture, teams can create more effective, maintainable, and valuable software that truly meets the needs of its users. The strategic design principles further provide guidance for managing complexity in large and integrated systems.
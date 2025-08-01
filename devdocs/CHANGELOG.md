# Changelog

This file tracks significant changes to the Metan project. For detailed information, refer to the linked ticket files.

## Core

### 2025-07-27

- [202507270900] Implement Pydantic-based consumer validation with generic typing ([details](core/202507270900-pydantic-consumer-validation.md))
- [202507270800] Refactored consumer architecture to separate Celery context from business logic, fixing inheritance issues and improving maintainability ([details](core/202507270800-consumer-architecture-refactor.md))

### 2025-07-26

- [202507261200] Enhanced logger system with enterprise-grade features including production JSON logging, configurable context management, and dynamic log styles ([details](core/202507261200-enterprise-logger-improvements.md))

### 2025-07-24

- [202507241725] Fixed Pydantic deprecation warning for model_fields access ([details](core/202507241725-fix-pydantic-deprecation-warning.md))
- [202507241702] Implemented unit tests for Pydantic-Settings environment management ([details](core/202507241702-pydantic-settings-env-tests.md))
- [202507241558] Implemented Pydantic-Settings for environment management ([details](core/202507241558-pydantic-settings-env.md))

## CLI

### 2025-07-27

- [202507272330] Refactored consumer structure into organized folders grouped by responsibility, improving maintainability and scalability ([details](cli/202507272330-consumer-structure-refactor.md))

### 2025-07-26

- [202507261030] Implemented single queue Celery system with dynamic routing for Quarkus integration ([details](cli/202507261030-single-queue-dynamic-routing.md))

### 2025-07-24

- [202507242326] Implemented Celery + RabbitMQ + Typer CLI with unit tests ([details](cli/202507242326-celery-rabbitmq-typer-cli.md))

## Services

*No changes recorded yet*

---

**Format:** `[YYYYMMDDHHMM] Brief description of change ([details](path/to/ticket-file.md))`
import {
    FunctionInput,
    FunctionHandler,
    InvocationContext,
    FunctionResult,
    FunctionOutput,
    FunctionTrigger,
} from "@azure/functions";
import { DurableOrchestrationClient, EntityState } from "../src/classes";
import { DurableEntityBindingInfo } from "../src/durableentitybindinginfo";
import { IEntityFunctionContext } from "../src/ientityfunctioncontext";
import { IOrchestrationFunctionContext } from "../src/iorchestrationfunctioncontext";
import { OrchestratorState } from "../src/orchestratorstate";
import { DurableOrchestrationInput } from "../src/testingUtils";

// orchestrations
export type OrchestrationHandler = (
    context: IOrchestrationFunctionContext
) => Generator<unknown, unknown, any>;

export type OrchestrationFunction = FunctionHandler &
    ((
        context: IOrchestrationFunctionContext,
        orchestrationTrigger: DurableOrchestrationInput
    ) => Promise<OrchestratorState>);

// entities
export type EntityHandler<T> = (context: IEntityFunctionContext<T>) => void;

export type EntityFunction<T> = FunctionHandler &
    ((
        context: IEntityFunctionContext<T>,
        entityTrigger: DurableEntityBindingInfo
    ) => Promise<EntityState>);

// activities
export type ActivityHandler<T> = FunctionHandler &
    ((context: InvocationContext, input: T) => FunctionResult<any>);

export type ActivityOptions<T> = {
    handler: ActivityHandler<T>;
    extraInputs?: FunctionInput[];
    extraOutputs?: FunctionOutput[];
};

// clients
export interface OrchestrationClientInput extends FunctionInput {
    type: "orchestrationClient";
}

export type OrchestrationClientHandler = (
    context: InvocationContext,
    triggerInput: any,
    orchestrationClient: DurableOrchestrationClient
) => FunctionResult<any>;

export interface OrchestrationClientOptions {
    handler: OrchestrationClientHandler;
    trigger: FunctionTrigger;
    return?: FunctionOutput;
    extraInputs?: FunctionInput[];
    extraOutputs?: FunctionOutput[];
}

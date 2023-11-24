# Genetic algorithm framework
A framework to make working with genetics algorithm easy

## Install
> npm i --save @coool/genetics

## Set up

### Create Candidate

```typescript car.ts
import { ICandidate, CandidateId, ICandidateMove } from '@coool/genetics';
import { RoadState } from './race';

export interface CarMove extends ICandidateMove {
  // Decision data of candidate
}

export class Car implements ICandidate {
  constructor(
    public id: CandidateId,
  ) {
  }
  
  public async getNextMoveAsync(roadState: RoadState): Promise<CarMove> {
    // Return turn decision of candidate
  }
}
```

### Create Candidate Factory

```typescript car.factory.ts
import { ICandidateFactory, ICandidate } from '@coool/genetics';
import { Car } from './car';

export class CarFactory implements ICandidateFactory {
  public createRandomCandidateAsync(): Promise<Car> {
    // Create a random candidate
  }

  public createCloneCandidateAsync(originalCandidate: Readonly<Car>): Promise<Car> {
    // Clone a candidate
  }

  public createCrossOverCandidateAsync(candidate1: Readonly<Car>, candidate2: Readonly<Car>): Promise<Car> {
    // Create a cross over from two parent candidates 
  }

  public createMutatedCandidateAsync(originalCandidate: Readonly<Car>): Promise<Car> {
    // Create a mutated version of the candidate
  }
}
```

### Create Candidate Test

```typescript race.ts
import { ICandidateTest, ICandidateTestResult, ICandidateTestFactory, ICandidateTestHistoryEntry, CandidateId } from '@coool/genetics';
import { Car } from 'car.ts';

export interface RaceResult extends ICandidateTestResult {
  history: RaceHistoryEntry[];
  candidateRanks: {
    candidateId: CandidateId;
    score: number;
  }[];
}

export interface RaceHistoryEntry extends ICandidateTestHistoryEntry {
  // Data relevant to turns of the candidate test
}

export class Race implements ICandidateTest {
  public async runAsync(cars: Car[]): Promise<ICandidateTestResult> {
    // Run test between candidates and return the result of the test 
  }
}

export class RaceFactory implements ICandidateTestFactory {
  public async createCandidateTestAsync(): Promise<Race> {
    // Create candidate test instance
  }
}
```

## Run

### Iterations
- Round tournament
    - Round tournament between population candidates
- Simple iteration
    - Run an iteration between all population candidates

### Populations
- Natural selection
    - Natural selection strategy to create new population

```typescript runner.ts
import { GeneticsRunnerBase } from '@coool/genetics';

export class CarGenetics extends GeneticsRunnerBase {
  constructor(
    carFactory: CarFactory,
    raceFactory: RaceFactory,
  ) {
    super(
      new NaturalSelectionPopulationFactory(carFactory),
      new RoundTournamentIteration(raceFactory),
    );
  }
}
```

```typescript main.ts
export class Main {
  constructor(
    private _carGenetics: CarGenetics,
  ) {
  }

  public async runAsync() {
    for (let i = 0; i < 100; i++) {
      const iterationResult = this._carGenetics.runNextPopulationAsync();
      
      console.log(iterationResult);
    }
  }
}
```

/* AGPL-3.0
 * LiberIT
 * */
#include <assert.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "pyashWords.h"
#include "sort.h"

void health_assess(const uint16_t training_series_long,
                   const uint16_t training_series[][2],
                   const uint16_t *program_output, uint16_t *health) {
  assert(training_series_long > 0);
  assert(training_series != NULL);
  assert(program_output != NULL);
  assert(health != NULL);
  uint16_t iteration = 0;
  uint16_t health_collector = 0;
  for (iteration = 0; iteration < training_series_long; ++iteration) {
    if (training_series[iteration][1] == program_output[iteration]) {
      ++health_collector;
    }
  }
  *health = health_collector;
}

void population_establish(const uint16_t ceremony_long, const v16us *ceremony,
                          const uint16_t population_long, v16us *population) {
  uint16_t iteration = 0;
  srand(5);
  for (iteration = 0; iteration < population_long; ++iteration) {
    population[iteration] = ceremony[rand() % 3];
  }
}

void program_interpret(const v16us program, const uint16_t input,
                       uint16_t *output) {
  uint16_t activity = program.s0;
  assert(activity != 0);
  switch (activity) {
  case plus_WORD:
    *output = input + 1;
    break;
  case return_WORD:
    *output = input;
    break;
  case invert_WORD:
    *output = ~input;
    break;
  default:
    assert(1 == 0);
  }
}

void program_quiz(const uint16_t training_series_long,
                  const uint16_t training_series[][2], const v16us program,
                  uint16_t *output) {
  assert(output != NULL);
  uint16_t iteration = 0;
  uint16_t program_output = 0;
  for (iteration = 0; iteration < training_series_long; ++iteration) {
    program_interpret(program, training_series[iteration][0], &program_output);
    output[iteration] = program_output;
  }
}

void population_quiz(const uint16_t population_long, const v16us *population,
                     const uint16_t training_series_long,
                     const uint16_t training_series[][2],
                     /*local*/ uint16_t *program_output,
                     uint16_t *population_health) {
  assert(population != NULL);
  assert(training_series != NULL);
  assert(population_health != NULL);
  uint16_t iteration = 0;
  v16us program = {0};
  uint16_t health = 0;
  for (iteration = 0; iteration < population_long; ++iteration) {
    program = population[iteration];
    program_quiz(training_series_long, training_series, program,
                 program_output);
    health_assess(training_series_long, training_series, program_output,
                  &health);
    population_health[iteration] = health;
  }
}

void champion_choose(const uint16_t population_long,
                     const uint16_t *population_health,
                     uint16_t *champion_iteration, uint16_t *champion_health) {
  assert(champion_health != NULL);
  assert(champion_iteration != NULL);
  assert(population_health != NULL);
  uint16_t iteration = 0;
  uint16_t fittest_health = 0;
  uint16_t fittest_iteration = 0; // expand to array for multiple fittest
  uint16_t health = 0;
  for (iteration = 0; iteration < population_long; ++iteration) {
    health = population_health[iteration];
    if (health > fittest_health) {
      fittest_iteration = iteration;
      fittest_health = health;
    }
  }
  *champion_iteration = fittest_iteration;
  *champion_health = fittest_health;
}

int main() {
#define TRAINING_SERIES_LONG 3
  const uint16_t training_series_long = TRAINING_SERIES_LONG;
  const uint16_t training_series[TRAINING_SERIES_LONG][2] = {
      {'1', '2'}, {'2', '3'}, {'3', '4'}}; // return input
  uint16_t program_output[TRAINING_SERIES_LONG] = {0};

#define CEREMONY_LONG 3
  const uint16_t ceremony_long = CEREMONY_LONG;
  const v16us ceremony[CEREMONY_LONG] = {
      {plus_WORD}, {return_WORD}, {invert_WORD}};

#define POPULATION_LONG 16
  const uint16_t population_long = POPULATION_LONG;
  v16us population[POPULATION_LONG] = {0};
  uint16_t population_health[POPULATION_LONG] = {0};

  uint16_t champion_iteration = 0;
  uint16_t champion_health = 0;

  population_establish(ceremony_long, ceremony, population_long, population);
  population_quiz(population_long, population, training_series_long,
                  training_series, program_output, population_health);
  champion_choose(population_long, population_health, &champion_iteration,
                  &champion_health);

  printf("0x%X is champion, %d is health\n", population[champion_iteration].s0,
         champion_health);

  return 0;
}

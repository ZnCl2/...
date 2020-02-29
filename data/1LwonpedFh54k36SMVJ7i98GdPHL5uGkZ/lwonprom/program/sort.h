#ifndef SORT_H
#define SORT_H

#include <stdint.h>
#define TABLET_BYTE_LONG 0x20
#define TABLET_LONG 0x10
#define TABLET_PAD_LONG 0x200
#define TABLET_FINALLY_INDICATOR 1

//#ifdef __APPLE__
//#include <OpenCL/opencl.h>
//#else
//#include <CL/cl.h>
//#endif

#ifndef __has_extension
#define __has_extension __has_feature // Compatibility with pre-3.0 compilers.
#endif
#ifndef __has_feature      // Optional of course.
#define __has_feature(x) 0 // Compatibility with non-clang compilers.
#endif
#ifndef __has_builtin      // Optional of course.
#define __has_builtin(x) 0 // Compatibility with non-clang compilers.
#endif

typedef unsigned int uint;

#if __has_builtin(__builtin_shufflevector)
#define shuffle __builtin_shufflevector
#endif
#if defined(_MSC_VER)
/* Microsoft C/C++-compatible compiler */
#include <intrin.h>
#elif defined(__GNUC__) && (defined(__x86_64__) || defined(__i386__))
/* GCC-compatible compiler, targeting x86/x86-64 */
#include <x86intrin.h>
#elif defined(__GNUC__) && defined(__ARM_NEON__)
/* GCC-compatible compiler, targeting ARM with NEON */
#include <arm_neon.h>
#elif defined(__GNUC__) && defined(__IWMMXT__)
/* GCC-compatible compiler, targeting ARM with WMMX */
#include <mmintrin.h>
#elif (defined(__GNUC__) || defined(__xlC__)) &&                               \
    (defined(__VEC__) || defined(__ALTIVEC__))
/* XLC or GCC-compatible compiler, targeting PowerPC with VMX/VSX */
#include <altivec.h>
#elif defined(__GNUC__) && defined(__SPE__)
/* GCC-compatible compiler, targeting PowerPC with SPE */
#include <spe.h>
#endif

#if EMSCRIPTEN
#include <stdint.h>
// typedef int v4si __attribute__((ext_vector_type(4)));
// typedef unsigned char v16uc __attribute__((ext_vector_type(16)));
// typedef unsigned int v4us __attribute__((vector_size(8)));
// typedef unsigned short v8us //__attribute__((vector_size(16)));
typedef union {
  uint16_t s0;
  uint16_t s1;
  uint16_t s2;
  uint16_t s3;
} v4us;
typedef union {
  uint16_t s0;
  uint16_t s1;
  uint16_t s2;
  uint16_t s3;
  uint16_t s4;
  uint16_t s5;
  uint16_t s6;
  uint16_t s7;
  uint16_t s8;
} v8us;
typedef union {
  uint16_t s0;
  uint16_t s1;
  uint16_t s2;
  uint16_t s3;
  uint16_t s4;
  uint16_t s5;
  uint16_t s6;
  uint16_t s7;
  uint16_t s8;
  uint16_t s9;
  uint16_t sA;
  uint16_t sB;
  uint16_t sC;
  uint16_t sD;
  uint16_t sE;
  uint16_t sF;
} v16us;
typedef unsigned long ulong;
#elif __has_feature(attribute_ext_vector_type)
// This code will only be compiled with the -std=c++11 and -std=gnu++11
// options, because rvalue references are only standardized in C++11.
#define CLANGCL
#include <stdint.h>
typedef int v4si __attribute__((ext_vector_type(4)));
typedef unsigned char v16uc __attribute__((ext_vector_type(16)));
typedef unsigned short v16us __attribute__((ext_vector_type(16)));
typedef unsigned short v8us __attribute__((ext_vector_type(8)));
typedef unsigned int v4us __attribute__((ext_vector_type(4)));
typedef unsigned long ulong;
#elif __OPENCL_CL_H
typedef cl_uchar uint8_t;
typedef cl_ushort uint16_t;
typedef cl_uint uint32_t;
typedef cl_ulong uint64_t;
typedef cl_short4 v4si;
typedef cl_uchar16 v16uc;
typedef cl_ushort16 v16us;
typedef cl_ushort8 v8us;
typedef cl_ushort4 v4us;
typedef unsigned long ulong;
#endif

#define V8US_LONG 16
/*#define NULL 0*/

#define TRUE 1
#define FALSE 0

void v4us_write(uint8_t code_indexFinger, uint8_t maximum_code_indexFinger,
                uint16_t code_number, v4us *code_name);

uint64_t v4us_uint64_translation(const v4us vector);
uint16_t v16us_read(const uint8_t indexFinger, const v16us vector);
void v16us_write(const uint8_t indexFinger, const uint16_t number,
                 v16us *vector);

uint16_t tablet_read(const uint16_t indexFinger, const uint8_t series_long,
                     const v16us *tablet);
void tablet_write(const uint16_t indexFinger, const uint16_t number,
                  const uint8_t series_long, v16us *tablet);

void tablet_word_write(const uint16_t indexFinger, const uint16_t number,
                       const uint8_t series_long, v16us *tablet,
                       uint16_t *neo_indexFinger);
uint16_t tablet_upcoming_word_read(const uint16_t indexFinger,
                                   const uint8_t series_long,
                                   const v16us *tablet,
                                   uint16_t *neo_indexFinger);
uint16_t tablet_retrospective_word_read(const uint16_t indexFinger,
                                        const uint8_t series_long,
                                        const v16us *tablet,
                                        uint16_t *neo_indexFinger);

void tablet_grammar_write(const uint16_t indexFinger, const uint16_t number,
                          const uint8_t series_long, v16us *tablet,
                          uint16_t *neo_indexFinger);
uint16_t tablet_upcoming_grammar_read(const uint16_t indexFinger,
                                      const uint8_t series_long,
                                      const v16us *tablet,
                                      uint16_t *neo_indexFinger);
uint16_t tablet_upcoming_grammar_or_quote_read(const uint16_t indexFinger,
                                               const uint8_t series_long,
                                               const v16us *tablet,
                                               uint16_t *neo_indexFinger);
uint16_t tablet_retrospective_grammar_read(const uint16_t indexFinger,
                                           const uint8_t series_long,
                                           const v16us *tablet,
                                           uint16_t *neo_indexFinger);

int v16us_print(const v16us tablet);
void v16us_forward_copy(const uint8_t abl, const uint8_t dat, const uint8_t ins,
                        v16us *tablet);

void tablet_upcoming_copy(const uint16_t abl, const uint16_t dat,
                          const uint16_t ins, const uint8_t series_long,
                          v16us *tablet);
int tablet_print(const uint8_t series_long, const v16us *tablet);
#endif

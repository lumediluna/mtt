"use strict";

/**
 * Примитивное правило для проверки структуры CIT-тестов:
 * - есть test.describe.configure({ mode: "serial" })
 * - есть объявление userA/B/C/D
 * - в каждом тесте [CIT-...] есть steps:
 *   "Открываем логин", "Настраиваем моки", "Входим в домен"
 */

export default {
  meta: {
    type: "problem",
    docs: {
      description:
        "Подгоняет структуру CIT-тестов под эталонный образец (serial describe, пользователи, steps)",
      recommended: false,
    },
    messages: {
      missingDescribeConfigure:
        'Ожидается вызов `test.describe.configure({ mode: "serial" });` в начале файла.',
      describeConfigureNotFirst:
        '`test.describe.configure({ mode: "serial" })` должен идти до всех `test(...)`.',
      missingUserConst:
        "Ожидается объявление пользователей userA/userB/userC/userD по образцу.",
      missingStepOpenLogin:
        'В тесте CIT ожидается step("Открываем логин", async () => { ... }).',
      missingStepMocks:
        'В тесте CIT ожидается step("Настраиваем моки", async () => { ... }).',
      missingStepLoginDomain:
        'В тесте CIT ожидается step("Входим в домен", async () => { ... }).',
    },
    schema: [],
  },

  create(context) {
    let describeConfigureNode = null;
    const testCallNodes = [];
    let hasUsersBlock = false;

    function isTestIdentifier(node) {
      return (
        node &&
        node.type === "Identifier" &&
        (node.name === "test" || node.name === "it")
      );
    }

    function isTestDescribeConfigure(node) {
      if (
        !node ||
        node.type !== "ExpressionStatement" ||
        node.expression.type !== "CallExpression" ||
        node.expression.callee.type !== "MemberExpression"
      ) {
        return false;
      }

      const callee = node.expression.callee;

      // ожидаем test.describe.configure(...)
      if (
        callee.object &&
        callee.object.type === "MemberExpression" &&
        callee.object.object.type === "Identifier" &&
        callee.object.object.name === "test" &&
        callee.object.property.type === "Identifier" &&
        callee.object.property.name === "describe" &&
        callee.property.type === "Identifier" &&
        callee.property.name === "configure"
      ) {
        const arg = node.expression.arguments[0];
        if (
          arg &&
          arg.type === "ObjectExpression" &&
          arg.properties.some((p) => {
            return (
              p.type === "Property" &&
              p.key.type === "Identifier" &&
              p.key.name === "mode" &&
              p.value.type === "Literal" &&
              p.value.value === "serial"
            );
          })
        ) {
          return true;
        }
      }

      return false;
    }

    function checkUsersBlock(node) {
      // очень грубо: смотрим, объявлены ли userA..userD в этом var/const
      const userNames = new Set();
      node.declarations.forEach((d) => {
        if (d.id.type === "Identifier") {
          userNames.add(d.id.name);
        }
      });
      if (
        userNames.has("userA") &&
        userNames.has("userB") &&
        userNames.has("userC") &&
        userNames.has("userD")
      ) {
        hasUsersBlock = true;
      }
    }

    function isCitTestCall(node) {
      if (!isTestIdentifier(node.callee)) {
        return false;
      }
      const firstArg = node.arguments[0];
      if (!firstArg || firstArg.type !== "Literal") return false;
      if (typeof firstArg.value !== "string") return false;
      return firstArg.value.indexOf("[CIT-") === 0;
    }

    function extractStepsFromBody(fn) {
      const names = [];
      if (!fn.body || fn.body.type !== "BlockStatement") return names;

      fn.body.body.forEach((stmt) => {
        // await step("...", async () => {})
        if (
          stmt.type === "ExpressionStatement" &&
          stmt.expression.type === "AwaitExpression" &&
          stmt.expression.argument.type === "CallExpression"
        ) {
          const call = stmt.expression.argument;

          // step("...")
          if (call.callee.type === "Identifier" && call.callee.name === "step") {
            const stepTitle = call.arguments[0];
            if (
              stepTitle &&
              stepTitle.type === "Literal" &&
              typeof stepTitle.value === "string"
            ) {
              names.push(stepTitle.value);
            }
          }

          // test.step("...")
          if (
            call.callee.type === "MemberExpression" &&
            call.callee.object.type === "Identifier" &&
            call.callee.object.name === "test" &&
            call.callee.property.type === "Identifier" &&
            call.callee.property.name === "step"
          ) {
            const stepTitle2 = call.arguments[0];
            if (
              stepTitle2 &&
              stepTitle2.type === "Literal" &&
              typeof stepTitle2.value === "string"
            ) {
              names.push(stepTitle2.value);
            }
          }
        }
      });

      return names;
    }

    return {
      Program(programNode) {
        programNode.body.forEach((stmt) => {
          if (stmt.type === "ExpressionStatement") {
            if (isTestDescribeConfigure(stmt)) {
              describeConfigureNode = stmt;
            }
          }

          if (stmt.type === "VariableDeclaration") {
            checkUsersBlock(stmt);
          }

          if (
            stmt.type === "ExpressionStatement" &&
            stmt.expression.type === "CallExpression" &&
            isTestIdentifier(stmt.expression.callee)
          ) {
            testCallNodes.push(stmt.expression);
          }
        });
      },

      "Program:exit"(programNode) {
        // 1. describe.configure
        if (!describeConfigureNode) {
          context.report({
            node: programNode,
            messageId: "missingDescribeConfigure",
          });
        } else {
          const describeIndex = programNode.body.indexOf(describeConfigureNode);
          const firstTestStmtIndex = programNode.body.findIndex((stmt) => {
            return (
              stmt.type === "ExpressionStatement" &&
              stmt.expression.type === "CallExpression" &&
              isTestIdentifier(stmt.expression.callee)
            );
          });

          if (
            firstTestStmtIndex !== -1 &&
            describeIndex > firstTestStmtIndex
          ) {
            context.report({
              node: describeConfigureNode,
              messageId: "describeConfigureNotFirst",
            });
          }
        }

        // 2. пользователи
        if (!hasUsersBlock) {
          context.report({
            node: programNode,
            messageId: "missingUserConst",
          });
        }

        // 3. CIT-тесты и steps
        testCallNodes.forEach((call) => {
          if (!isCitTestCall(call)) return;

          const fnArg = call.arguments[2];
          if (
            !fnArg ||
            (fnArg.type !== "ArrowFunctionExpression" &&
              fnArg.type !== "FunctionExpression")
          ) {
            return;
          }

          const steps = extractStepsFromBody(fnArg);

          if (!steps.some((s) => s.indexOf("Открываем логин") !== -1)) {
            context.report({
              node: call,
              messageId: "missingStepOpenLogin",
            });
          }

          if (!steps.some((s) => s.indexOf("Настраиваем моки") !== -1)) {
            context.report({
              node: call,
              messageId: "missingStepMocks",
            });
          }

          if (!steps.some((s) => s.indexOf("Входим в домен") !== -1)) {
            context.report({
              node: call,
              messageId: "missingStepLoginDomain",
            });
          }
        });
      },
    };
  },
};
// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  type QuestionnaireState,
  QuestionnaireView,
} from "@/components/questionnaire/QuestionnaireView";

const state: QuestionnaireState = {
  assessmentId: "assessment_1",
  dsptYear: "2025-26",
  completionPercent: 20,
  standards: [
    {
      _id: "standard_1",
      number: 1,
      title: "Personal Confidential Data",
      description: "desc",
      itemCount: 2,
      answeredCount: 1,
    },
    {
      _id: "standard_2",
      number: 2,
      title: "Staff Responsibilities",
      description: "desc",
      itemCount: 1,
      answeredCount: 0,
    },
  ],
  currentStandard: {
    _id: "standard_1",
    number: 1,
    title: "Personal Confidential Data",
    description: "desc",
    items: [
      {
        _id: "item_1",
        ref: "1.1.1",
        inputType: "yes_no",
        plainEnglishQuestion: "Do staff lock screens?",
        evidenceText: "Evidence text",
        clinicHelp: "Help text",
        mandatory: true,
        yesNoValue: null,
        textValue: "",
      },
      {
        _id: "item_2",
        ref: "1.1.2",
        inputType: "text",
        plainEnglishQuestion: "Describe your policy",
        evidenceText: "Evidence text",
        clinicHelp: "Help text",
        mandatory: false,
        yesNoValue: null,
        textValue: "",
      },
    ],
  },
};

describe("QuestionnaireView", () => {
  afterEach(() => {
    cleanup();
  });

  it("calls onSelectStandard when a different standard is selected", async () => {
    const onSelectStandard = vi.fn();
    render(
      <QuestionnaireView
        state={state}
        savingItemIds={new Set()}
        onSelectStandard={onSelectStandard}
        onSaveYesNo={vi.fn()}
        onSaveText={vi.fn()}
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: /standard 2/i }));
    expect(onSelectStandard).toHaveBeenCalledWith(2);
  });

  it("calls onSaveYesNo when yes/no option is clicked", async () => {
    const onSaveYesNo = vi.fn();
    render(
      <QuestionnaireView
        state={state}
        savingItemIds={new Set()}
        onSelectStandard={vi.fn()}
        onSaveYesNo={onSaveYesNo}
        onSaveText={vi.fn()}
      />,
    );

    await userEvent.click(screen.getAllByRole("button", { name: "Yes" })[0]);
    expect(onSaveYesNo).toHaveBeenCalledWith("item_1", "yes");
  });

  it("calls onSaveText with updated text value", async () => {
    const onSaveText = vi.fn();
    render(
      <QuestionnaireView
        state={state}
        savingItemIds={new Set()}
        onSelectStandard={vi.fn()}
        onSaveYesNo={vi.fn()}
        onSaveText={onSaveText}
      />,
    );

    const input = screen.getAllByPlaceholderText("Add your answer")[0];
    await userEvent.type(input, "abc");

    expect(onSaveText).toHaveBeenLastCalledWith("item_2", "abc");
  });
});

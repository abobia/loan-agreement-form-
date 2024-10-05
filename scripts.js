// Helper function to calculate the number of working days between two dates
function calculateWorkingDays(startDate, endDate) {
  let count = 0;
  const currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    const dayOfWeek = currentDate.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      // Ignore Sundays and Saturdays
      count++;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return count;
}

document
  .getElementById("loanAgreementForm")
  .addEventListener("input", function (event) {
    const loanAmount = parseFloat(document.getElementById("loanAmount").value);
    const duration = parseInt(document.getElementById("duration").value);
    const currentDate = new Date();

    if (!isNaN(loanAmount) && !isNaN(duration)) {
      // Calculate processing fee (5% of loan amount)
      const processingFee = loanAmount * 0.05;
      document.getElementById("processingFee").value = processingFee.toFixed(2);

      // Calculate start date (22 working days after today)
      let startDate = new Date(currentDate);
      let workingDaysAdded = 0;
      while (workingDaysAdded < 22) {
        startDate.setDate(startDate.getDate() + 1);
        if (startDate.getDay() !== 0 && startDate.getDay() !== 6) {
          workingDaysAdded++;
        }
      }
      document.getElementById(
        "commencementDate"
      ).value = startDate.toISOString().split("T")[0];

      // Calculate maturity date (start date plus loan duration in months)
      const maturityDate = new Date(startDate);
      maturityDate.setMonth(maturityDate.getMonth() + duration);
      maturityDate.setDate(startDate.getDate()); // Ensure the day is consistent
      document.getElementById(
        "maturityDate"
      ).value = maturityDate.toISOString().split("T")[0];

      // Calculate monthly installment (simple interest of 6.5% per month, divided by duration)
      const interestRate = 0.065;
      const totalInterest = loanAmount * interestRate * duration;
      const totalAmount = loanAmount + totalInterest;
      const monthlyInstallment = totalAmount / duration;
      document.getElementById(
        "monthlyInstallment"
      ).value = monthlyInstallment.toFixed(2);

      // Calculate one month loan installment (10% interest on loan amount)
      const oneMonthLoanInstallment = loanAmount * 1.1;
      document.getElementById(
        "oneMonthLoanInstallment"
      ).value = oneMonthLoanInstallment.toFixed(2);
    }
  });

document.getElementById("submitButton").addEventListener("click", function () {
  document.getElementById("confirmationModal").style.display = "block";
});

document.getElementById("confirmSubmit").addEventListener("click", function () {
  document.getElementById("confirmationModal").style.display = "none";
  alert("Loan agreement form has been submitted!");
  // Submit the form here
  document.getElementById("loanAgreementForm").submit();
});

document.getElementById("cancelSubmit").addEventListener("click", function () {
  document.getElementById("confirmationModal").style.display = "none";
});

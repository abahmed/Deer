# GitHub workflow

If you have never used git or GitHub, you may also need to check [Hello World in GitHub Guides](https://guides.github.com/activities/hello-world/).

Firstly, You need to [Fork](https://help.github.com/articles/fork-a-repo/) Deer repository `abahmed/Deer` then clone it on your local machine using

`git clone https://github.com/YOUR-USER_NAME/Deer`

According to GitHub naming we will call : 
+ The repository you have forked **origin** and its link is `https://github.com/YOUR-USER_NAME/Deer`
+ This repository **upstream** and its link is `https://github.com/abahmed/Deer`

The previous steps are done once, then these steps that you should follow every time you work on patch(es) or feature(s):


1. Fetch code and create a local branch

    ```
    git fetch upstream
    git checkout -b LOCAL_BRANCH_NAME upstream/develop
    ```

2. Do your code changes then commit

    ```
    git commit -a -m "Issue #ISSUE_NUMBER: BRIEF_DESCRIPTION."
    ```

3. Push commit you have made to your fork

    ```
    git push -u origin "LOCAL_BRANCH_NAME"
    ```

4. Create a [Pull Request(PR)](https://help.github.com/articles/using-pull-requests/) to the branch **develop**. To notify the reviewer that will review this PR, you can write r? @USER_NAME

5. After getting reviewers' feedback - if something needs to be changed, added, removed or fixed and these changes  are minor (means you didn't get **r+**, just fix it in a new commit on the same branch 
    
    ```
    git commit --fixup SHA1_OF_THE_PREVIOUS_COMMIT (You can get it using **git log**)
    ```

6. Use step 3 to update the Pull Request. Repeat steps 5-6 until the review is accepted.

7. When you notice that there is a change on **upstream** that affects your patch or files you have worked on, you need to update and rebase your local branch

    ```
    git fetch upstream
    git rebase upstream/develop
    ```
